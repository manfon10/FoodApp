import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addFoodCartThunk } from '../../redux/actions';

const FoodsCategory = ({ foods, style }) => {

    const { isLoged } = useSelector( state => state.user );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getRating = (array) => {

        let promedio = 0;

        for( let i = 0; i < array.length; i++) {
            promedio = promedio + parseInt(array[i].qualification);
        }

        return promedio / array.length;
    }

    return (
        <>
            {
                foods.map( food => (
                    <div>
                        <Link to={`/food/${food.id}`} key={food.id}>
                            <img src={food.foods_images[0]?.image_url} alt={food.title} />
                        </Link>
                        <div className={style.button_add_cart}>
                            <h3>{food.title} - {food.category.name}</h3>
                            <i 
                                className="fa-solid fa-circle-plus" 
                                onClick={ () => isLoged ? ( dispatch(addFoodCartThunk({ foodsPlateId: food.id, quantity: 1 })) ) : ( navigate("/login") ) }
                            ></i>
                        </div>
                        <span>{food.description}</span>
                        <div className={style.data_qualification}>
                            <div>
                                <i className="fa-solid fa-star"></i>
                                <p>{getRating(food.foods_qualifications)}</p>
                            </div>
                            <p>${food.price}</p>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default FoodsCategory;