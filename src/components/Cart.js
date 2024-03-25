import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { remove, setQuantity } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import artist from '../images/artist.jpg';
import Swal from "sweetalert2";
import axios from 'axios';

function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const token = localStorage.getItem('x-api-key');

    function handleCheckout() {
        if (isAuthenticated) {
            // localStorage.removeItem('cart');
            navigate("/checkout");
        } else {
            navigate("/signin");
        }
    };

    // Retrieve cart data from local storage and parse it from JSON

    const storedCartData = localStorage.getItem('cart');

    const products = useSelector((state) => state.cart);

    let productsData = products.length > 0 ? products : JSON.parse(storedCartData);

    if (!productsData) {
        productsData = [];
    };

    const removeFromCart = async function (_id) {
        console.log(_id);
        if (isAuthenticated) {
            try {
                const response = await axios.post('api/cart/remove',
                    {
                        _id: _id
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": token,
                        },
                    });

                const result = response.data;

                console.log(result);

                if (result.status === 200) {
                    Swal.fire("Successfully!", "Removed.");
                };
                dispatch(remove(_id));
                alert('selected item has been deleted');
            } catch (error) {
                console.log(error);
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message
                })
            }
        } else {
            dispatch(remove(_id));
            alert('selected item has been deleted');
        };
    };

    const handleQuantityChange = (_id, quantity) => {
        dispatch(setQuantity({ _id, quantity: parseInt(quantity, 10) }));
    };

    const cards = productsData.map((product, index) => [
        <div className="col-md-12" style={{ marginBottom: "10px" }} key={product._id}>
            <Card className="h-100">
                <div className="text-center">
                    <Card.Img
                        variant="top"
                        src={artist}
                        style={{ width: "300px", height: "150px" }}
                    />
                </div>
                <Card.Body>
                    <Card.Title>{product.category}</Card.Title>
                    <Card.Text>{product.name}</Card.Text>
                    <Card.Text>INR:{product.price}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                min="1"
                                style={{ width: "50px" }}
                            />
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: "white" }} className="text-center">
                    <Button variant="danger" onClick={() => removeFromCart(product._id)}>Remove Item</Button>
                </Card.Footer>
            </Card>
        </div>
    ]);

    return (
        <>
            {cards}
            {productsData.length > 0 ? (
                <button type="button" className="btn btn-primary mb-3" onClick={handleCheckout}>
                    Checkout
                </button>
            ) : (
                <div>
                    <h1>Your Cart is empty</h1>
                </div>
            )}
        </>
    );
}

export default Cart;
