import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk, getFoodsThunk } from '../../redux/actions';
import { CategoryList, FoodsList, TopFoods } from '../../components';

const Home = () => {

    const dispatch = useDispatch();

    const { categoryList } = useSelector( state => state.categories );
    const { foodsList, foodsFilter } = useSelector( state => state.foods );

    useEffect(() => {
        dispatch(getCategoriesThunk());
        dispatch(getFoodsThunk());
    }, [dispatch]);

    return (
        <>
            <CategoryList categories={categoryList} />
            <FoodsList foods={foodsList} />
            <TopFoods foods={foodsFilter} />
        </>
    );
};

export default Home;