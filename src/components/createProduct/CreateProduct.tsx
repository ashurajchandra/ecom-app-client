import React, { useState,useContext } from 'react';
import {
  Typography,
  Button,
  TextField,
  Box,
  Modal,
  Grid
} from '@mui/material';
import axios from 'axios';
import {setRefetch} from '../../context/authentication/Action';
import {AuthContext} from '../../context/authentication/AuthContext';
import  ToastNotification, { showErrorToast, showSuccessToast }  from "../shared/toast/Toaster";

interface Props{
    isModalOpen:boolean;
    handleCloseModal:()=>void;
}
interface Product{
    name:string;
    description:string;
    price:number|null;
    quantity:number|null;
}
export const CreateProduct:React.FC<Props> = ({handleCloseModal,isModalOpen}) => {
  const {dispatch} = useContext(AuthContext);
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    description: '',
    quantity:null ,
    price:null ,
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/products/createProduct', newProduct);
      dispatch(setRefetch(true))
      showSuccessToast("Product created")
      setTimeout(()=>{
        handleCloseModal()
      },2000);
    
    } catch (error) {
      console.error('Error creating product:', error);
      showErrorToast(error)
    }
  };

  return (
    <div>
         <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            backgroundColor: 'white',
            p: 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" id="modal-title">
            Add New Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                name="quantity"
                placeholder='0'
                type="number"
                value={newProduct.quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                placeholder='0'
                value={newProduct.price}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            style={{ marginTop: '16px' }}
            disabled={!newProduct.name.trim() || newProduct.price==null || newProduct.quantity==null }
          >
            Create Product
          </Button>
        </Box>
      </Modal>
      <ToastNotification/>
    </div>
  );
};
