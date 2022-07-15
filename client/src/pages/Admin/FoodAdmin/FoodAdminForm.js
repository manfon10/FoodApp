import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getCategoriesThunk, createFoodThunk } from '../../../redux/actions';

const FoodAdminForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    useEffect( () => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    const { categoryList } = useSelector( state => state.categories );

    const [ file, setFile ] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const createFoodHandle = (data) => {

        const formData = new FormData();

        formData.append("categoryId", data.categoryId);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append("title", data.title);
        formData.append("image", file);

        dispatch(createFoodThunk(formData));
        
        navigate('/admin_foods');

    }

    return (
        <>
            <form onSubmit={handleSubmit(createFoodHandle)}>
                <input 
                    type="text"
                    placeholder="Nombre plato"
                    {...register("title", { required: true })}
                />
                <textarea 
                    cols="30" 
                    rows="10"
                    placeholder="Descripcion del plato"
                    {...register("description", { required: true })}
                ></textarea>
                <select {...register("categoryId", { requuired: true })}>
                    {
                        categoryList.map( category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <input 
                    type="number"
                    placeholder="Cantidad"
                    {...register("quantity", { required : true })}
                />
                <input 
                    type="number"
                    placeholder="Precio"
                    {...register("price", { required : true })}
                />
                <input 
                    type="file"
                    onChange={handleFile}
                />
                <button>Crear</button>
            </form>
        </>
    );
};

export default FoodAdminForm;