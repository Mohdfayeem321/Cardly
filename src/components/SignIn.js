import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../store/authSlice";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        try {
            e.preventDefault();
            dispatch(login());
            const response = await axios.post("api/signin",
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const result = response.data;

            if (result.status === 200) {
                Swal.fire("Successfully!", "Signin.");
                //Navigate to a different page
                localStorage.setItem('isAuthenticated', 'true');
                navigate("/checkout");
            }
        } catch (error) {
            console.log(error);
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
            })

        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Sign In</h3>
                            <form onSubmit={handleSignIn}>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </form>
                            <p className="mt-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
