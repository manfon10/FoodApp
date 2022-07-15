import React from 'react';
import { useNavigate  } from 'react-router-dom';
import style from './NavbarLogin.module.css';

const NavbarLogin = () => {

    const navigate = useNavigate()

    return (
        <div className={style.container_menu}>
            <button onClick={ () => navigate('/')}><i className="fa-solid fa-left-long"></i> Volver</button>
            <p>FoodApp</p>
            <div></div>
        </div>
    );
};

export default NavbarLogin;