import React, { useEffect, useState,useContext } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/authentication/AuthContext';
interface Product {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

const API_URL = "http://localhost:8000/api/products/getAllProducts"

export const ProductList: React.FC = () => {
  const {state,dispatch} = useContext(AuthContext)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetchProducts()
  }, [state.refetch]);

   const fetchProducts = async()=>{
    try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
      
   }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2} style={{padding:"4%"}}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id} >
         <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography color="textSecondary">
                Price: ${product.price}
              </Typography>
              <Typography color="textSecondary">
                Quantity: {product.quantity}
              </Typography>
              <Typography color="textSecondary">
                Description: {product.description}
              </Typography>
            </CardContent>
          </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

