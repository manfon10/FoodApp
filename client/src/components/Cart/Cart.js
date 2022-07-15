import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFoodsInCartThunk, setCloseCart } from '../../redux/actions';
import CartList from './CartList';
import ButtonPurchase from './ButtonPurchase';
import style from './Cart.module.css';

const Cart = () => {

    const dispatch = useDispatch();

    const { userInfo, isLoged } = useSelector( state => state.user );
    const { foodsInCart } = useSelector( state => state.cart );
    const { isOpenCart } = useSelector( state => state.app );

    useEffect(() => {
        dispatch(getFoodsInCartThunk());
    }, [isOpenCart]);

    return (
        <div className={ isOpenCart ? style.background_cart : '' } style={ isOpenCart ? { } : { display: 'none' } }>
            <div className={ isOpenCart ? style.container_cart : '' }>
                <h3>Tu canasta <i className="fa-solid fa-xmark" onClick={ () => dispatch(setCloseCart(false)) }></i></h3>
                <div>
                    <CartList foods={foodsInCart} style={style} />
                    <ButtonPurchase style={style} />
                </div>
            </div>
        </div>
    );
};

export default Cart;