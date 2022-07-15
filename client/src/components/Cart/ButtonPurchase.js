import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseCartThunk } from '../../redux/actions';

const ButtonPurchase = ({ style }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { foodsInCart } = useSelector( state => state.cart );

    return (
        <div className={style.button_purchase}>
            <button onClick={ () => foodsInCart.length <= 0 ? navigate('/login') : dispatch(purchaseCartThunk()) }>
                {
                    foodsInCart.length <= 0 ? (
                        'Comenzar a comprar'
                    ) : (
                        'Comprar Ahora'
                    )
                }
            </button>
        </div>
    );
};

export default ButtonPurchase;