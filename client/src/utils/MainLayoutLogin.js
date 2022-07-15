import React from 'react';
import { NavbarLogin } from '../components';
import { Outlet } from 'react-router-dom';

const MainLayaoutLogin = () => {
    return (
        <>
            <NavbarLogin />
            <Outlet />
        </>
    );
};

export default MainLayaoutLogin;