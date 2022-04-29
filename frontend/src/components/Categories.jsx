import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {mobile} from "../responsive";
import CategoryItem from "./CategoryItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;



function Categories(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/categories"
                );
                setCategories(res.data);
            } catch (err) {
                console.log(err.getMessage());
            }
        };
        getCategories();
    }, []);

    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem category={item} />
            ))}
        </Container>
    );
}

export default Categories;