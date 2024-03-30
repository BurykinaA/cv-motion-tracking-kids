import React, { Suspense, useEffect , useState, } from "react";
import '../App.css';
import { Routes, Route, Navigate, redirect } from 'react-router-dom';
import { privateRoutes } from '../router/routes';


const AppRouted = () => {
    let routesToRender;

    routesToRender = privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component/>} exact={true} />
      ));
    return (
        <Routes>
            {routesToRender}
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    ) 
};

export default AppRouted;
