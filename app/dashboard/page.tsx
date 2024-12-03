'use client';

import { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box, Paper, TableSortLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import {Button, Navbar, Nav } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<string>('name');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestedDishes, setSuggestedDishes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/get-csv-data')
      .then((response) => {
        setData(response.data.data);
        setFilteredData(response.data.data);
        toast.success('Data fetched successfully!');
      })
      .catch((error) => {
        toast.error('Error fetching data');
        console.error(error);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = data.filter((row) =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.ingredients.toLowerCase().includes(e.target.value.toLowerCase()) ||
      row.region.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const currentData = sortData(filteredData).slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleDishClick = (dishName: string) => {
    router.push(`/dish-details/${dishName}`);
  };

  const handleIngredientChange = (event: any) => {
    const value = event.target.value;
    setIngredients(value);
    const filteredDishes = data.filter((dish) =>
      value.every((ingredient: string) => dish.ingredients.toLowerCase().includes(ingredient.toLowerCase()))
    );
    setSuggestedDishes(filteredDishes);
  };

  const filterDataByIngredients = (dishes: any[]) => {
    if (ingredients.length === 0) return dishes;
    return dishes.filter(dish =>
      ingredients.every(ingredient =>
        dish.ingredients.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
  };

  const filteredDishes = filterDataByIngredients(currentData);

  return (
    <div>
      <Navbar bg="primary" expand="lg" className="mb-3 d-flex justify-content-between px-3">
                <Navbar.Brand className="text-white">Dish Table</Navbar.Brand>
                <Nav className="ml-auto">
                <Button className="bg-Danger text-white" onClick={() => { router.push('/login'); }}>LogOut</Button>
                </Nav>
            </Navbar>
    
      <Box sx={{ mb: 3}}>
        <FormControl fullWidth>
          <InputLabel>Choose Ingredients</InputLabel>
          <Select
            multiple
            value={ingredients}
            onChange={handleIngredientChange}
            renderValue={(selected) => selected.join(', ')}
            sx={{ width: '20%' }}
          >
            {['Rice flour', 'Coconut', 'Jaggery', 'Banana', 'Ghee'].map((ingredient) => (
              <MenuItem key={ingredient} value={ingredient}>
                {ingredient}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        label="Search by food name, ingredients, or region"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3, width: '50%' }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: 10 }} aria-label="Data table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('name')}
                >
                  Food Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Diet Type</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'prep_time'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('prep_time')}
                >
                  Preparation Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'cook_time'}
                  direction={sortOrder}
                  onClick={() => handleRequestSort('cook_time')}
                >
                  Cooking Time
                </TableSortLabel>
              </TableCell>
              <TableCell>Flavor</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Region</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDishes.map((row, index) => (
              <TableRow key={index} hover onClick={() => handleDishClick(row.name)}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.ingredients}</TableCell>
                <TableCell>{row.diet}</TableCell>
                <TableCell>{row.prep_time}</TableCell>
                <TableCell>{row.cook_time}</TableCell>
                <TableCell>{row.flavor_profile}</TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ToastContainer />
    </div>
  );
}
