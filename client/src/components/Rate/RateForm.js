import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderQualification, setOpenRate } from '../../redux/actions';

const RateForm = ({foodRate, foodId}) => {

    const { userInfo } = useSelector( state => state.user );

    const dispatch = useDispatch();

    return (
        <>
            {
                foodRate.map( food => (
                    food.userId === userInfo.id ? (
                        <>
                            <i className="fa-solid fa-check" style={{ color: '#29d884'}}></i>
                        </>
                    ) : (
                        <i 
                            className="fa-solid fa-star" 
                            onClick={ () => { 
                                dispatch(setOrderQualification(foodId))
                                dispatch(setOpenRate(true))
                            }}
                        ></i>
                    )
                ))
            }
        </>
    );
};

export default RateForm;