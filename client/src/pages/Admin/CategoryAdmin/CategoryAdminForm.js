import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateCategoryThunk, getCategoriesByIdThunk } from '../../../redux/actions';

const CategoryAdminForm = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [ food, setFood ] = useState({});

    useEffect(() => {
        dispatch(getCategoriesByIdThunk(id))
            .then( (res) => setFood(res.data.categories[0]));
    }, [dispatch]);

    const handleFoodSelected = (e) => {
        setFood({
            image: e.target.file[0]
        });
    }

    const { register, handleSubmit, setValue } = useForm();

    const handleUpdate = (e) => {

        e.preventDefault();
        
        const formData = new FormData();

        formData.append('name', food.name);
        formData.append('image', food.image);

        dispatch(updateCategoryThunk(formData));

    }

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <p>Imagen</p>
                <img src={food.categories_images?.[0].image_url} alt={food.name} />
                <p>Nueva Imagen</p>
                <input 
                    type="file"
                    onChange={handleFoodSelected}
                />
                <p>Nombre Categoria</p>
                <input 
                    type="text"
                    value={food.name}
                    {...register("name")}
                />
                <button>Guardar</button>
            </form>
        </div>
    );
};

export default CategoryAdminForm;