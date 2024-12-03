'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Navbar, Nav } from 'react-bootstrap';
import {signIn } from '@/utils/auth';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const { error, user } = await signIn(email, password);
        if (error) {
            setError((error as { message: string }).message);
            toast.error((error as { message: string }).message);
        } else {
            if(user?.Token){
                toast.success('Login successful');
                router.push('/dashboard');
            }
        }
    }

    return (
        <div>
            <Navbar bg="primary" expand="lg" className="mb-3 d-flex justify-content-between px-3">
                <Navbar.Brand className="text-white">Login Page</Navbar.Brand>
                <Nav className="ml-auto">
                    <Button variant="outline-danger text-white" onClick={() => { router.push('/signup'); }}>Signup</Button>
                </Nav>
            </Navbar>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="card card-body" onSubmit={handleLogin}>
                            <h3 className="text-center mb-4">Login</h3>
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
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            <p className="text-center mt-3">
                                Don't have an account? <a href="/signup">Signup</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
