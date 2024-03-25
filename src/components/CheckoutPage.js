import React from 'react';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {

    const products = useSelector((state) => state.cart);

    const totalSum = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    const totalItems = products.length;

    return (
        <div className="container mt-5">
            <h2>Products Summary</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        {products.length > 0 ? (
                            <div className="card-body">
                                <h5 className="card-title">Total</h5>
                                <p>Total Items: {totalItems}</p>
                                <p>Total Price: {totalSum}</p>
                                <button className="btn btn-primary">Pay Now</button>
                            </div>
                        ) : (
                            <div>
                                <h1>Your Cart is empty</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
