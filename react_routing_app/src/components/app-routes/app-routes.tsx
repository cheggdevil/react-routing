import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../header';
import Login from '../login/login';
import { Home } from '../home';
import AboutUs from '../about-us/about-us';

const PrivateRoute = ({ element, isLoggedIn }: any) => {
    return !isLoggedIn ? <Navigate to="/signin" /> : element;
};

export default function AppRoutes() {
    const token = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!token); // convert token to a boolean value
    }, [token]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const routes = [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/signin", element: <Login onLogin={handleLogin} /> }
    ];

    return (
        <Router>
            {isLoggedIn && <Header />}
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
                <Route
                    path="/"
                    element={<PrivateRoute element={<Home />} isLoggedIn={isLoggedIn} />}
                />
            </Routes>
        </Router>
    );
}
