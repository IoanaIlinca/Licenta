import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {popularProducts} from "../data";
import Product from "./Product";
import axios from "axios";


const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Products({category, filters, sort}) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    category && category !== ""
                        ? `http://localhost:5000/api/products?category=${category}`
                        : "http://localhost:5000/api/products"
                );
                setProducts(res.data);
            } catch (err) {
                console.log(err.getMessage());
            }
        };
        getProducts();
    }, [category]);

    useEffect(() => {
        filters &&
        setFilteredProducts(
            products.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    value === '' || item[key].includes(value)
                )
            )
        );
    }, [products, category, filters]);



    useEffect(() => {
        switch (sort) {
            case 'newest':
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                );
                break;
            case 'oldest':
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                );
                break;
            case 'asc':
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => a.price - b.price)
                );
                break;
            case 'desc':
                setFilteredProducts((prev) =>
                    [...prev].sort((a, b) => b.price - a.price)
                );
                break;
            default:
                break;
        }
        console.log(filteredProducts);
    }, [sort]);

    return (
        <Container>
            {category
                ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
                : filteredProducts
                    .slice(0, 8)
                    .map((item) => <Product item={item} key={item.id} />)}
        </Container>
    );
}

export default Products;