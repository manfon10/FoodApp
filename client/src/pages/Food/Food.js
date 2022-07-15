import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodByIdThunk, getFoodByCategoryThunk } from '../../redux/actions';
import { FoodDetail, FoodsByCategory } from '../../components';
import style from './Food.module.css';

const Food = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { foodDetails, foodsCategory } = useSelector( state => state.foods );

    useEffect(() => {
        dispatch(getFoodByIdThunk(id));
        dispatch(getFoodByCategoryThunk(foodDetails[0]?.categoryId));
    }, [dispatch, id]);

    return (
        <div className={style.container_food_detail}>
            <FoodDetail food={foodDetails} />
            <h2 style={{ marginBottom: '20px'}}>Platos que te pueden gustar</h2>
            <FoodsByCategory foods={foodsCategory} style={style} />
        </div>
    );
};

export default Food;