import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";

// Encargada de validar si el usuario esta autenticado para ver alguna pagina, sino login
export default function ProtectedRoute() {
    const auth = useAuth()
    console.log('use auth', auth)

    return auth.isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}