import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Foods/Food.module.css';

const TopFoods = ({foods}) => {

    const getRating = (array) => {

        let promedio = 0;

        for( let i = 0; i < array.length; i++) {
            promedio = promedio + parseInt(array[i].qualification);
        }

        return promedio / array.length;
    }

    return (
        <>
            <h2 className={style.title_top_foods}>Top Platos</h2>
            <div className={style.container_top_foods}>
                {
                    foods.map( food => (
                        <>
                            {
                                getRating(food.foods_qualifications) > 4.5 && (
                                    <Link to={`/food/${food.id}`} key={food.id}>
                                        <div>
                                            <img src={food.foods_images[0].image_url} alt={food.title} />
                                        </div>
                                        <div className={style.data_top_food}>
                                            <h4>{food.title}</h4>
                                            <span>{food.description}</span>
                                            <div className={style.price_top_food}>
                                                <div>
                                                    <i className="fa-solid fa-star"></i>
                                                    <p>{getRating(food.foods_qualifications)}</p>
                                                </div>
                                                <p>${food.price}</p>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                )
                            }
                        </>
                    ))
                }
            </div>
        </>
    );
};

export default TopFoods;