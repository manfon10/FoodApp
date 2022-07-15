import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/actions';

const LoginForm = ({ style }) => {

    const dispatch = useDispatch();

    const handleLogin = (data) => {
        dispatch(loginThunk(data));
    }

    const { register, handleSubmit } = useForm();

    return (
        <div>
            <h1 className={style.title_login}>Iniciar sesión</h1>
                <div className={style.container_form_login}>
                    <form onSubmit={handleSubmit(handleLogin)}>
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
                        <button>Iniciar Sesion</button>
                    </form>
                    <p className={style.text_signup}>¿Aún no te has registrado? <Link to={'/signup'}>Registrate aquí</Link></p>
                </div>
        </div>
    );
};

export default LoginForm;