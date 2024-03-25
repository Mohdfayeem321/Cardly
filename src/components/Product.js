import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import statusCodes from "../utils/StatusCodes";
import artist from '../images/artist.jpg';
import axios from "axios";
import Swal from 'sweetalert2';

const Product = () => {
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("x-api-key");
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const dispatch = useDispatch();
    const { data: products, status } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products) {
            const uniqueCategories = [...new Set(products.map(product => product.category))];
            setCategories(uniqueCategories);
        }
    }, [products]);


    if (status === statusCodes.Loading) {
        return <h1>Loading...</h1>
    }

    if (status === statusCodes.Error) {
        return <h1>Something Went Wrong...</h1>
    }

    const addToCart = async (product) => {
        if (isAuthenticated) {
            try {
                const response = await axios.post('api/cart/add', product, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": token,
                    },
                });
                const result = response.data;
                dispatch(add(product));
                if (result.status === 201) {
                    Swal.fire("Successfully!", "Product Added.");
                }
            } catch (error) {
                console.log(error);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message
                });
            }
        } else {
            dispatch(add(product));
            alert('added successfully')
        }
    };

    const renderProductsByCategory = (category) => {
        return products.filter(product => product.category === category).map((product, index) => (
            <div className="col-md-3" style={{ marginBottom: "10px" }} key={product.id}>
                <Card className="h-100">
                    <div className="text-center">
                        <Card.Img
                            variant="top"
                            src={artist}
                            style={{ width: "250px", height: "150px" }}
                        />
                    </div>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>INR: {product.price}</Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ backgroundColor: "white" }} className="text-center">
                        <Button variant="primary" onClick={() => addToCart(product)}>
                            Add To Cart
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        ));
    };

    const renderCategories = () => {
        return categories.map((category, index) => (
            <div key={index}>
                <h2>{category}</h2>
                <div className="row">
                    {renderProductsByCategory(category)}
                </div>
            </div>
        ));
    };

    return (
        <>
            {renderCategories()}
        </>
    );
};

export default Product;
