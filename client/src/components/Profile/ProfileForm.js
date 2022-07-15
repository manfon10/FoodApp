import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateDataUserThunk } from '../../redux/actions';

const ProfileForm = ({ style, userInfo }) => {

    const { register, handleSubmit } = useForm();

    const [ data, setData ] = useState({
        names: userInfo.names,
        email: userInfo.email,
        address: userInfo.address
    });

    const dispatch = useDispatch();

    const handleEdit = (data) => {
        dispatch(updateDataUserThunk(data.id, data));
    }

    return (
        <>
            <h4>Información de tu cuenta</h4>
            <form className={style.form_data_user} onSubmit={handleSubmit(handleEdit)}>
                <div className={style.user_info_one}>
                    <div>
                        <p>Nombres</p>
                        <input 
                            type="text"
                            value={data.names}
                            className={style.input_form_user}
                            {...register("names")}
                            onChange={ (e) => setData(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Correo Electronico</p>
                        <input 
                            type="email"
                            value={data.email}
                            className={style.input_form_user}
                            {...register("email")}
                            onChange={ (e) => setData(e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.user_info_two}>
                    <p>Direccion</p>
                    <input 
                        type="text"
                        value={data.address}
                        className={style.input_form_user}
                        {...register("address")}
                        onChange={ (e) => setData(e.target.value)}                     
                    />
                </div>
                <button>Actualizar Datos</button>
            </form>
        </>
    );
};

export default ProfileForm;