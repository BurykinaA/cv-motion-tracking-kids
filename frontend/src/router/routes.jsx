// import About from "../pages/About";

import Home from "../pages/Home";
import StartPage from "../pages/StartPage";


export const privateRoutes = [
    {path: '/', Component: StartPage, exact: true},
    {path: '/train', Component: Home, exact: true},
    {path: '/train/:id', Component: Home, exact: true},
    ]


