import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {

        try {

            e.preventDefault();
            const response = await axios.post(
                "api/signup",
                {
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = response.data;

            console.log(result);
            if (result.status === 201) {
                Swal.fire("Successfully!", "Signun.");
                //Navigate to a different page
                navigate("/signin");
            };
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
                            <h3 className="card-title mb-4">Sign Up</h3>
                            <form onSubmit={handleSignUp}>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                            <p className="mt-3">Already have an account? <Link to="/signin">Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
