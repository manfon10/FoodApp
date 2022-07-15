import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFoodsThunk } from '../../../redux/actions';

const FoodAdminList = ({style}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect( () => {
        dispatch(getFoodsThunk());
    }, [dispatch]);

    const { foodsList } = useSelector( state => state.foods );

    const getRating = (array) => {

        let promedio = 0;

        for( let i = 0; i < array.length; i++) {
            promedio = promedio + parseInt(array[i].qualification);
        }

        return promedio / array.length;
    }

    return (
        <>
            <button onClick={ () => navigate('/admin_foods/create')}>Crear Plato</button>
            <table className={style.table_orders}>
                <thead>
                    <th>ID</th>
                    <th>Categoria</th>
                    <th style={{ width: '210px' }}>Plato</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Calificacion</th>
                    <th>Acciones</th>
                </thead>
                <tbody className={style.table_tbody}>
                    {
                        foodsList.map( food => (
                            <tr key={food.id}>
                                <td style={{ textAlign: 'center' }}>{food.id}</td>
                                <td style={{ textAlign: 'center' }}>{food.category.name}</td>
                                <td style={{ display: 'flex', alignItems: 'center' }}>
                                    {
                                        <>
                                            <img src={food.foods_images[0].image_url} alt={food.title} />
                                            <div>
                                                <p>{food.title}</p>
                                                <span>{food.description}</span>
                                            </div>
                                        </>
                                    }
                                </td>
                                <td style={{ textAlign: 'center' }}>{food.quantity}</td>
                                <td style={{ textAlign: 'center' }}>{food.price}</td>
                                <td style={{ textAlign: 'center' }}> <i className="fa-solid fa-star"></i>{getRating(food.foods_qualifications)}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default FoodAdminList;