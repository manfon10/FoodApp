import React from 'react';
import FoodPost from './FoodPost';
import style from './Food.module.css';

const FoodsList = ({ foods }) => {

    const foodsHome = (array) => {
        return [...array]
            .sort( () => Math.random() > 0.5 ? 1 : -1).slice(0, 5)
    }

    return (
        <>
            <div className={style.food_title}>
                <h2>Algunos Platos</h2>
            </div>
            <div className={style.container_food_list}>
                {
                    foodsHome(foods).map( food => (
                        <FoodPost key={food.id} food={food} />
                    ))
                }
            </div>
        </>
    );
};

export default FoodsList;