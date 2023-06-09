import { LoadingButton } from "@mui/lab";
import { Divider, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const { basket} = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();
    const item = basket?.items.find(i => i.productId == product?.id);

    useEffect(() => {
        if (item){
            setQuantity(item.quantity);
        } 
        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id, item])
    function hundleInputChange(event: any) {
        const updatedQuantity = parseInt(event.target.value);
        if (event.target.value >= 0) {
            setQuantity(updatedQuantity);
        }
       
    }
    function hundleUpdateCard() {
        setSubmitting(true);
        if (!item || item.quantity < quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, updatedQuantity)
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false))
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, updatedQuantity)
                .then(() => dispatch(removeItem({productId:product?.id!, quantity:updatedQuantity})))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false))
        }
    }
    if (loading) return <LoadingComponent message='Loading product...' />
    if (!product) return <NotFound />
    return (

        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            onChange={hundleInputChange}
                            value={quantity} />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton loading={submitting} disabled={item?.quantity==quantity || (!item && quantity ===0)} onClick={hundleUpdateCard} sx={{ height: '55px' }} color='primary'
                            size='large' variant='contained' fullWidth>
                            {item ? 'Update Quantity' : 'Add To Card'}
                        </LoadingButton>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}

function dispatch(arg0: any): any {
    throw new Error("Function not implemented.");
}
