import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signupThunk } from '../../redux/actions';

const SignupForm = ({ style }) => {

    const dispatch = useDispatch();

    const handleSingup = (data) => {
        dispatch(signupThunk(data));
    }

    const { register, handleSubmit } = useForm();

    return (
        <div>
            <h1 className={style.title_signup}>Regístrate</h1>
            <div className={style.container_form_signup}>
                <form onSubmit={handleSubmit(handleSingup)}>
                    <input 
                        type="text"
                        placeholder="Nombre"
                        {...register("names", { required: true })}
                    />
                    <input 
                        type="email"
                        placeholder="Correo Electronico"
                        {...register("email", { required: true })}
                    />
                    <input 
                        type="password"
                        placeholder="Contraseña"
                        {...register("password", { required: true })}
                    />
                    <input 
                        type="text"
                        placeholder="Direccion"
                        {...register("address", { required: true })}
                    />
                    <button>Registrar</button>
                </form>
                <p className={style.text_login}>¿Ya tienes una cuenta? <Link to={'/login'}>Inicia sesión aquí</Link></p>
            </div>
        </div>
    );
};

export default SignupForm;