import React from 'react';
import { LoginImage, LoginForm } from '../../components';
import style from './Login.module.css';

const Login = () => {
    return (
        <div className={style.container_login}>
            <LoginImage style={style}/>
            <LoginForm style={style} />
        </div>
    );
};

export default Login;