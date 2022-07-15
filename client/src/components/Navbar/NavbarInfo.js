import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCloseNav } from '../../redux/actions';
import style from './Navbar.module.css';

const NavbarInfo = () => {

    const { userInfo, isLogued } = useSelector( state => state.user );
    const { isOpenNav } = useSelector( state => state.app );

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div className={isOpenNav ? style.background_navbar_info : ''} style={isOpenNav ? { } : { display: 'none' }}>
            <div className={isOpenNav ? style.container_navbar_info : ''}>
                <div>
                    <h3>FoodApp <i className="fa-solid fa-xmark" onClick={ () => dispatch(setCloseNav(false)) }></i></h3>
                </div>
                <div>
                    {
                        isLogued ? ( 
                            <button>Perfil</button> 
                        ) : (
                            <>
                                <button onClick={ () => navigate('/login') }>Ingreso</button>
                                <button onClick={ () => navigate('/signup') }>Registro</button>
                            </>
                        )
                    }
                </div>
                <div className={style.container_sections}>
                    <p>SECCIONES { userInfo.roleId == 1 && ('ADMIN') }</p>
                    <Link to="/">Home <i className="fa-solid fa-angle-right"></i></Link>
                    {
                        userInfo.roleId == 1 && (
                            <>
                                <Link to="/admin_foods">Platos Admin <i className="fa-solid fa-angle-right"></i></Link>
                                <Link to="/admin_categories">Categorias <i className="fa-solid fa-angle-right"></i></Link>
                                <Link to="/admin_orders">Ordenes <i className="fa-solid fa-angle-right"></i></Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default NavbarInfo;