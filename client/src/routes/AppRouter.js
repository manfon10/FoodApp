import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomRouter from '../utils/CustomRouter';
import history from '../utils/History';
import MainLayaout from '../utils/MainLayout';
import MainLayaoutLogin from '../utils/MainLayoutLogin';
import { Login, SignUp, Home, Food, Category, Profile, FoodAdminHome, CategoryAdminHome, OrdesAdminHome, FoodAdminForm, CategoryAdminForm } from '../pages';
import ProtectedRoutes from '../utils/ProtectedRoutes';

const AppRouter = () => {
    return (
        <>
            <CustomRouter history={history}>
                <Routes>
                    <Route element={ <MainLayaoutLogin /> }>
                        <Route path="/login" element={ <Login /> }/>
                        <Route path="/signup" element={ <SignUp /> }/>
                    </Route>
                    <Route element={ <MainLayaout /> }>
                        <Route path="/" element={ <Home /> }/>
                        <Route path="/food/:id" element={ <Food /> }/>
                        <Route path="/foods/categories/:id" element={ <Category /> }/>
                        <Route element={ <ProtectedRoutes /> }>
                            <Route path="/profile" element={ <Profile /> }/>
                            <Route path="/admin_foods" element={ <FoodAdminHome /> }/>
                            <Route path="/admin_foods/create" element={ <FoodAdminForm /> }/>
                            <Route path="/admin_categories" element={ <CategoryAdminHome /> }/>
                            <Route path="/admin_categories/update/:id" element={ <CategoryAdminForm /> }/>
                            <Route path="/admin_orders" element={ <OrdesAdminHome /> }/>
                        </Route>
                    </Route>
                </Routes>
            </CustomRouter>
        </>
    );
};

export default AppRouter;