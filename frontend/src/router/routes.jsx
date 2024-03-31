// import About from "../pages/About";

import Home from "../pages/Home";
import Library from "../pages/Library";
import StartPage from "../pages/StartPage";


export const privateRoutes = [
    {path: '/', Component: StartPage, exact: true},
    {path: '/train', Component: Home, exact: true},
    {path: '/train/:id', Component: Home, exact: true},
    {path: '/library', Component: Library, exact: true},
]
export const publicRoutes = [
    {path: '/', Component: StartPage, exact: true},
]
    
    

