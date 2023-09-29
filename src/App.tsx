import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ProductList,
  Navbar,
  ProductDetail,
  Login,
  Register,
  Cart,
} from "./components";
import {
  initialAuthState,
  authStateReducer,
} from "./context/authentication/Reducer";
import { AuthContext } from "./context/authentication/AuthContext";
function App() {
  const [state, dispatch] = useReducer(authStateReducer, initialAuthState);
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    if (state.isAuthenticated) {
      setLogin(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar isLogin={isLogin} />
        <Routes>
          {!state.isAuthenticated && (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </>
          )}

          <Route path='/' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
