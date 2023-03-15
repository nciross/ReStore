import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard";
interface IProps {
    products: Product[];
}
export default function ProductList({ products }: IProps) {
    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}