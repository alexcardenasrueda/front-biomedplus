import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './pages/home/home';
import Login from './pages/login/login';
import Inventario from './pages/inventario/inventario'
import Solicitudes from './pages/solicitudes/solicitudes'
import Providers from './pages/providers/providers'
import App from './App';
import ProtectedRoute from './ProtectedRoute';
import SignUp from './pages/login/sign-up';


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/sign-up" element={<SignUp />} />


                    <Route exact path="/" element={<ProtectedRoute />} >
                        <Route exact path="/home" element={<Home />} />
                        <Route exact path="/inventario" element={<Inventario />} />
                        <Route exact path="/solicitudes" element={<Solicitudes />} />
                        <Route exact path="/providers" element={<Providers />} />
                    </Route>
                    <Route path="*" element={<App />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
};