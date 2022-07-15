import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createCategoryThunk } from '../../../redux/actions';

const CategoryAdminForm = ({ style }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const [ file, setFile ] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const createHandle = (data) => {

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('image', file);

        dispatch(createCategoryThunk(formData));
        
    }

    return (
        <div className={style.container_form_add_category}>
            <h2>Crear Categoria</h2>
            <form onSubmit={handleSubmit(createHandle)}>
                <input 
                    type="text"
                    placeholder="Nombre categoria"
                    {...register("name", { required: true })}
                />
                <input 
                    type="file"
                    onChange={handleFile}
                />
                <button>Guardar</button>
            </form>
        </div>
    );
};

export default CategoryAdminForm;