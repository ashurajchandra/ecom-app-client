
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../../context/authentication/AuthContext';
import { setGetUserCart } from '../../context/authentication/Action';
import  ToastNotification, { showErrorToast, showSuccessToast }  from "../shared/toast/Toaster";


interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

const defaultProduct = {
  id:0,
  name:'',
  price:0,
  quantity:0,
  description:''
}

export const ProductDetail: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(AuthContext);
  const { productId } = useParams<{ productId: string }>();
  const [productDetail, setProductDetail] = useState<Product>(defaultProduct);
  const [editable, setEditable] = useState(false);
  const [editedProductDetail, setEditedProductDetail] = useState<Product>(defaultProduct);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProductDetail();
  }, [productId]);

  const getProductDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8000/api/products/getProductDetail/${productId}`);
      setProductDetail(response.data);
      setEditedProductDetail(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      showErrorToast(error)
      setIsLoading(false);
    }
  };

  const handleIncreaseQuantity = (quantity: number) => {
    updateProductQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = (quantity: number) => {
    if (quantity > 1) {
      updateProductQuantity(quantity - 1);
    }
  };

  const updateProductQuantity = async (quantity: number) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`http://localhost:8000/api/products/updateProductDetail/${productId}`, {
        quantity: quantity,
      });
      setProductDetail(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating quantity:', error);
      showErrorToast(error)
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(`http://localhost:8000/api/products/updateProductDetail/${productId}`, {
        name: editedProductDetail?.name,
        price: editedProductDetail?.price,
        description: editedProductDetail?.description,
      });
      setProductDetail(response.data);
      setEditable(false);
      setIsLoading(false);
      showSuccessToast("Product updated")
    } catch (error) {
      console.error('Error updating product details:', error);
      showErrorToast(error)
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:8000/api/products/deleteProduct/${productId}`);
      showSuccessToast("Product deleted")
      setTimeout(()=>{
        navigate("/")
      },2000)
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      setIsLoading(false);
      showErrorToast(error)
    }
  };

    const handleAddToCart = async() => {
    try{
        const product = {
         name:productDetail?.name,
         description:productDetail?.description,
         price:productDetail?.price,
         quantity:productDetail?.quantity
        }
      setIsLoading(true)
      const response = axios.post("http://localhost:8001/api/carts",product,{
        headers:{
          Authorization:`${localStorage.getItem("token")}`
        }
      })
      dispatch(setGetUserCart(true))
      showSuccessToast("Product added to cart")
      setIsLoading(false)

    }catch(error){
      console.log("error in adding product to cart")
      setIsLoading(false)
      showErrorToast(error)
    }
  };

  return (
    <div>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <img
                src="product-image.jpg"
                alt={productDetail?.name || ''}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">
                {editable ? (
                  <TextField
                    value={editedProductDetail?.name || ''}
                    onChange={(e) =>
                      setEditedProductDetail({
                        ...editedProductDetail,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  productDetail?.name
                )}
              </Typography>
              <Typography variant="h6" color="primary">
                Rs. {editable ? (
                  <TextField
                    value={editedProductDetail?.price || ''}
                    onChange={(e) =>
                      setEditedProductDetail({
                        ...editedProductDetail,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                ) : (
                  productDetail?.price
                )}
              </Typography>
              {editable ? (
                <TextField
                  value={editedProductDetail?.description || ''}
                  onChange={(e) =>
                    setEditedProductDetail({
                      ...editedProductDetail,
                      description: e.target.value,
                    })
                  }
                  multiline
                  fullWidth
                />
              ) : (
                <Typography variant="body1">
                  {productDetail?.description}
                </Typography>
              )}
              <Box mt={2}>
                <Typography variant="subtitle1">
                  Quantity: {productDetail?.quantity}
                </Typography>
                {!editable ? (
                  <>
                    <IconButton
                      onClick={() =>
                        handleDecreaseQuantity(productDetail?.quantity || 0)
                      }
                      disabled={productDetail?.quantity === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleIncreaseQuantity(productDetail?.quantity || 0)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </>
                ) : null}
              </Box>
              <Box mt={2}>
                {editable ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveEdit}
                    sx={{ marginRight: '8px' }}
                  >
                    Save
                  </Button>
                ) : (
                  <Tooltip title={!state.isAuthenticated?'sign-in to edit product':'edit product'} placement="top">
                  <IconButton
                    edge="end"
                    aria-label="Edit"
                    onClick={handleEditClick}
                    sx={{ marginRight: '8px' }}
                    disabled={!state.isAuthenticated}
                  >
                    <EditIcon />
                  </IconButton>
                  </Tooltip>
                )}
                <Tooltip title={!state.isAuthenticated?'sign-in to delete product':'delete product'} placement="top">
                <IconButton
                  edge="end"
                  aria-label="Delete"
                  onClick={handleDeleteProduct}
                  disabled={!state.isAuthenticated}
                >
                  <DeleteIcon />
                </IconButton>
                </Tooltip>
              </Box>
              {!editable ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{ marginTop: '16px' }}
                >
                  Add to Cart
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
        <ToastNotification />
      </Container>
    </div>
  );
};

