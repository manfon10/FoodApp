import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addFoodCartThunk } from '../../redux/actions';

const FoodDetail = ({ food }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const handleAddFood = (data) => {
        dispatch(addFoodCartThunk(data));
    }

    return (
        <>
            {
                food.map( foodInfo => (
                    <div>
                        <img src={foodInfo.foods_images[0].image_url} alt="" key={foodInfo.id}/>
                        <div>
                            <h2>{foodInfo.title}</h2>
                            <p>{foodInfo.description}</p>
                            <div>
                                <span>Cantidad Disponible: {foodInfo.quantity}</span>
                                <span>Categoria: Comida {foodInfo.category.name}</span>
                            </div>
                            <form onSubmit={handleSubmit(handleAddFood)}>
                                <input 
                                    type="hidden"
                                    value={foodInfo.id}
                                    {...register("foodsPlateId")}
                                />
                                <input 
                                    type="number"
                                    placeholder="Cantidad"
                                    {...register("quantity", { required: true })}
                                />
                                <button>Agregar</button>
                            </form>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default FoodDetail;