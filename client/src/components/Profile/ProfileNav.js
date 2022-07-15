import React from 'react';

const ProfileNav = ({ userInfo, style, setType }) => {
    return (
        <div className={style.container_nav_user}>
            <div className={style.data_user}>
                <span>Mi Perfil</span>
                <p>{userInfo.names?.split(" ")[0]}</p>
            </div>
            <button onClick={ () => setType("ProfileForm")}>
                <i className="fa-solid fa-user"></i>
                Mis Datos
            </button>
            <button onClick={ () => setType("UserOrders")}>
                <i className="fa-solid fa-bag-shopping"></i>
                Ordenes
            </button>
        </div>
    );
};

export default ProfileNav;