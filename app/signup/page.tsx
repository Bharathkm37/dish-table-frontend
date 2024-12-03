'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Navbar, Nav } from 'react-bootstrap'; 
import { signUp} from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';

export default function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }

        const { error } = await signUp(email, password, `${firstName} ${lastName}`);
        if (error) {
            setError((error as unknown as { message: string }).message);
            toast.error((error as unknown as { message: string }).message);
        } else {
            toast.success('Signup successful');
            router.push('/login');
        }
    };

    return (
        <div>
            <Navbar bg="primary" expand="lg" className="mb-3 d-flex justify-content-between px-3">
                <Navbar.Brand className="text-white">Sign Up Page</Navbar.Brand>
                <Nav className="ml-auto">
                    <Button variant="outline-danger text-white" onClick={() => { router.push('/login'); }}>Login</Button>
                </Nav>
            </Navbar>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-body" onSubmit={handleSignup}>
                            <h3 className="text-center mb-4">Signup</h3>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Signup</button>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            <p className="text-center mt-3">
                                Already have an account? <a href="/login">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
