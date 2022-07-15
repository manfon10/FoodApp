import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../../pages/Category/Category.module.css';

const CategoryList = ({ categories }) => {
    return (
        <div className={style.container_categories}>
            {
                categories?.map(({ id, name, categories_images }) => (
                    <Link to={`/foods/categories/${id}`} key={id}>
                        <img src={categories_images[0].image_url} alt={name} />
                        <p>{name}</p>
                    </Link>
                ))
            }
        </div>
    );
};

export default CategoryList;