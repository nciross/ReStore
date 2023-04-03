import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { decrement, increment } from "./counterSlice";


export default function ContactPage() {
    const { data, title } = useAppSelector(state=>state.counter)
    const dispatch = useAppDispatch();
    return (
        <>
            <Typography variant='h2'>{title}</Typography>
            <Typography variant='h5'>This is data : {data}</Typography>
            <ButtonGroup>
            <Button onClick={()=>dispatch(increment(5))}  color='secondary'>Increment by 5</Button>
            <Button onClick={()=>dispatch(increment(1))} color='primary'>Increment</Button>
            <Button onClick={()=>dispatch(decrement(1))} color='error'>Decrement</Button>
            </ButtonGroup>
          
        </>

    )
}