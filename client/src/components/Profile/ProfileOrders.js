import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getOrderByUserThunk, setOrderQualification, rateFoodThunk, setCloseRate } from '../../redux/actions';
import { RateForm } from '../../components';

const ProfileOrders = ({ style }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    useEffect( () => {
        dispatch(getOrderByUserThunk());
    }, [dispatch]);

    const { orderByUserList, idFoodQualication } = useSelector( state => state.orders );
    const { isOpenRate } = useSelector( state => state.app );

    const handleQualification = (data) => {
        dispatch(rateFoodThunk(idFoodQualication, data));
    }

    return (
        <>
            <table className={style.table_orders}>
                <thead>
                    <th>ID</th>
                    <th>Status</th>
                    <th style={{ width: '210px' }}>Plato</th>
                    <th>Precio Total</th>
                    <th>Calificacion</th>
                </thead>
                <tbody className={style.table_tbody}>
                    {
                        orderByUserList.map( (order, i) => (
                            <>
                                <tr key={order.id}>
                                    <td style={{ textAlign: 'center' }}>{order.id}</td>
                                    <td style={{ textAlign: 'center' }}>{order.cart.status}</td>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        {
                                            <>
                                                <img src={order.foods_plate.foods_images[0].image_url} alt={order.foods_plate.title} />
                                                <div>
                                                    <p>{order.foods_plate.title}</p>
                                                    <span>{order.foods_plate.description}</span>
                                                </div>
                                            </>
                                        }
                                    </td>
                                    <td style={{ textAlign: 'center' }}>$ {order.total_price}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <RateForm 
                                            foodRate={order.foods_plate.foods_qualifications.slice(0, order.foods_plate.foods_qualifications.length)}
                                            foodId={order.foods_plate.id}
                                        />
                                    </td>
                                </tr>
                                <div className={isOpenRate ? style.container_form_qualification : ''} style={isOpenRate ? { } : { display: 'none' }}>
                                    <div>
                                        <h3>Calificar el plato <i className="fa-solid fa-xmark" onClick={ () => dispatch(setCloseRate(false)) }></i></h3>
                                        <form onSubmit={handleSubmit(handleQualification)}>
                                            <input 
                                                type="number"
                                                placeholder="Del 1 a 5"
                                                {...register("qualification", { required: true } )}
                                                min="1" max="5"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </>
                        ))
                        
                    }
                </tbody>
            </table>
        </>
    );
};

export default ProfileOrders;