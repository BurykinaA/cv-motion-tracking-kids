import React, { Suspense, useContext, useEffect , useState, } from "react";
import '../App.css';
import { Routes, Route, Navigate, redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { AuthContext } from "../context/context";


const AppRouted = () => {
    let routesToRender;
    // const {isAuth}= useContext(AuthContext)

    {localStorage.name!=''?
        routesToRender = privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component/>} exact={true} />
        ))
    :
        routesToRender = publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component/>} exact={true} />
        ))
    }
    return (
        <Routes>
            {routesToRender}
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    ) 
};

export default AppRouted;
