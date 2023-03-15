import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(response => response.json())
            .then(data => setProducts(data))
        axios.get("http://localhost:5000/products")
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])
    if (loading) return <h3>Loading ...</h3>
    return (
        <>
            <ProductList products={products} />
        </>
    )
}