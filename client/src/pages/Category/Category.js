import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodByCategoryThunk } from '../../redux/actions';
import { FoodsCategory } from '../../components';
import style from './Category.module.css';

const Category = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFoodByCategoryThunk(id));
    }, [dispatch]);

    const { foodsCategory } = useSelector( state => state.foods );
    
    return (
        <>
            <h2 style={{ fontFamily: 'Archivo, sans-serif', marginTop: '20px', marginLeft: '20px' }}>Comida {foodsCategory[0]?.category.name}</h2>
            <div className={style.container_foods_category}>
                <FoodsCategory foods={foodsCategory} style={style} />
            </div>
        </>
    );
};

export default Category;