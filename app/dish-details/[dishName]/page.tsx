'use client';


import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Navbar, Nav } from 'react-bootstrap';
import { Paper, Box, Typography, CircularProgress } from '@mui/material';

const DishDetails = () => {
  const router = useRouter();
  const { dishName } = useParams();

  const [dish, setDish] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dishName) {
      setLoading(true);

      axios.get(`http://localhost:5000/api/get-dish-details/?name=${dishName}`)
        .then(response => {
          setDish(response.data.data[0]);
          setLoading(false);
        })
        .catch(error => {
          setError('Dish not found or error occurred.');
          setLoading(false);
        });
    }
  }, [dishName]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error" sx={{ marginTop: '50px', textAlign: 'center' }}>{error}</Typography>;
  }

  return (
    <div>
        <Navbar bg="primary" expand="lg" className="mb-3 d-flex justify-content-between px-3">
            <Navbar.Brand className="text-white">Dish Details</Navbar.Brand>
            <Nav className="ml-auto">
                <Button className="bg-Danger text-white" onClick={() => { router.push('/login'); }}>LogOut</Button>
            </Nav>
        </Navbar>
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4">Dish Name: {dish?.name}</Typography>
      <Typography variant="h6">Ingredients: {dish?.ingredients}</Typography>
     <Typography variant="h6">Preparation Time: {dish?.prep_time}</Typography>
      <Typography variant="h6">Cooking Time: {dish?.cook_time}</Typography>
      <Typography variant="h6">Diet: {dish?.diet}</Typography>
      <Typography variant="h6">Flavor Profile: {dish?.flavor_profile}</Typography>
      <Typography variant="h6">Course: {dish?.course}</Typography>
      <Typography variant="h6">State: {dish?.state}</Typography>
      <Typography variant="h6">Region: {dish?.region}</Typography>
    </Paper>
    </div>
  );
};

export default DishDetails;
