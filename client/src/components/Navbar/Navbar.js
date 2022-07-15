import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavbarInfo from './NavbarInfo';
import Cart from '../Cart/Cart';
import { setOpenNav, setOpenCart, filterFoodThunk } from '../../redux/actions';
import style from './Navbar.module.css';

const Navbar = () => {

    const { isLoged, userInfo } = useSelector( state => state.user );

    const [ isOpen, setIsOpen ] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const logOut = () => {
        localStorage.setItem("tokenUser", "");
        navigate("/login");
    }

    const handleFilter = (data) => {
        dispatch(filterFoodThunk(data.phrase));
    }

    return (
        <div >
            <div className={style.container_navbar}>
                <div>
                    <i className="fa-solid fa-bars" onClick={ () => dispatch(setOpenNav(true)) }></i>
                    <NavbarInfo />
                    <p className={style.title_app} onClick={ () => navigate("/")}>FoodApp</p>
                </div>
                <div className={style.address_user}>
                    <i className="fa-solid fa-location-dot"></i>
                    {
                        isLoged ? ( <p>{ userInfo.address }</p> ) : ( <p>Inicie Sesión</p> )
                    }
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleFilter)} className={style.form_search}>
                        <input 
                            type="text" 
                            placeholder="Busca en FoodApp"
                            {...register('phrase', { required: true })}
                        />
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                <div className={style.info_cart}>
                    <Cart />
                    <button onClick={ () => dispatch(setOpenCart(true)) }><i className="fa-solid fa-cart-shopping"></i></button>
                    {
                        isLoged ? ( <span onClick={ () => isOpen ? setIsOpen(false) : setIsOpen(true) }>{userInfo.names.slice(0, 1)}</span> ) : ( <Link to="/login">Ingreso</Link> )
                    }
                </div>
            </div>
            {
                isLoged && (
                    <div className={ isOpen ? style.modal_user_open : style.modal_user_close }>
                        <Link to="/profile"><i className="fa-solid fa-user"></i> Perfil</Link>
                        <p onClick={ logOut }><i className="fa-solid fa-right-to-bracket"></i> Cerrar Sesión</p>
                    </div>
                )
            }
        </div>
    );
};

export default Navbar;