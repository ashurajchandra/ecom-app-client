import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to show an error toast message
export const showErrorToast = (message:any) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Function to show a success toast message
export const showSuccessToast = (message:any) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const ToastNotification = () => {
  return (
    <div>
      {/* ToastContainer component handles rendering the toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ToastNotification;
