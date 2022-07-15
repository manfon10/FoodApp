import React from 'react';
import { Link } from 'react-router-dom';
import style from './Food.module.css';

const FoodPost = ({ food }) => {
    return (
        <div className={style.container_food}>
            <Link to={`/food/${food.id}`}>
                <img src={food.foods_images[0]?.image_url} alt={food.title} />
                <h3>{food.title} - {food.category.name}</h3>
                <span>{food.description}</span>
                <p>${food.price}</p>
            </Link>
        </div>
    );
};

export default FoodPost;