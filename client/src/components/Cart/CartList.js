import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newQuantityFoodThunk, deleteFoodInCartThunk, resetAmountFoodInCartThunk } from '../../redux/actions';

const CartList = ({ foods, style }) => {

    const dispatch = useDispatch();

    const { foodsInCart } = useSelector( state => state.cart );

    return (
        <>
            {
                foods.map( food => (
                    <>
                        {
                            foodsInCart.length === 0 ? (
                                <div>
                                    <i className="fa-solid fa-cart-circle-plus"></i>
                                    <h1>Aún no tienes productos en tu canasta</h1>
                                </div>
                            ) : (
                                <div key={food.id} className={style.container_foods_in_cart}>
                                    <div className={style.foods_info}>
                                        <img src={food.foods_plate.foods_images[0].image_url} alt="" />
                                            <div>
                                                <div>
                                                    <h5>{food.foods_plate.title}</h5>
                                                    <p>{food.foods_plate.description}</p>
                                                </div>
                                                <div className={style.food_actions_cart}>
                                                    <span>$ {food.foods_plate.price * food.quantity}</span>
                                                    <div>
                                                        <button 
                                                            onClick={ 
                                                                () => food.quantity <= 1 
                                                                    ? dispatch(deleteFoodInCartThunk(food.id)) 
                                                                    : dispatch(resetAmountFoodInCartThunk(food.id))
                                                            }
                                                        > 
                                                            {
                                                                food.quantity >= 2 ? (
                                                                    <i className="fa-solid fa-minus"></i>
                                                                ) : (
                                                                    <i className="fa-solid fa-trash"></i>
                                                                )
                                                            } 
                                                        </button>
                                                        <span>{food.quantity}</span>
                                                        <button 
                                                            onClick={ 
                                                                () => dispatch(newQuantityFoodThunk({
                                                                    positionFood: food.id,
                                                                    foodsPlateId: food.foodsPlateId,
                                                                    newQuantity: 1
                                                                })) 
                                                            }
                                                        >
                                                            <i className="fa-solid fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                ))
            }
        </>
    );
};

export default CartList;