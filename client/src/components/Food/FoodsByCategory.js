import React from 'react';
import { Link } from 'react-router-dom';

const FoodsByCategory = ({ foods, style }) => {

    const getRating = (array) => {

        let promedio = 0;

        for( let i = 0; i < array.length; i++) {
            promedio = promedio + parseInt(array[i].qualification);
        }

        return promedio / array.length;
    }

    return (
        <section className={style.container_foods_by_category}>
            {
                foods.map( food => (
                    <Link to={`/food/${food.id}`} key={food.id} className={style.foods_by_category}>
                        <div>
                            <img src={food.foods_images[0].image_url} alt={food.title} />
                        </div>
                        <div className={style.data_food}>
                            <h4>{food.title}</h4>
                            <span>{food.description}</span>
                            <div>
                                <i className="fa-solid fa-star"></i>
                                <p>{getRating(food.foods_qualifications)}</p>
                            </div>
                            <p>${food.price}</p>
                        </div>
                    </Link>
                ))
            }
        </section>
    );
};

export default FoodsByCategory;