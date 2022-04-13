import React from 'react';
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <Products></Products>
            <Newsletter></Newsletter>
        </div>
    )
}

export default Home
