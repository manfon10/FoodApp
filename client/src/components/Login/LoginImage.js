import React from 'react';
import image_login from '../../assets/components/imagen_login.PNG';

const LoginImage = ({ style }) => {
    return (
        <div className={style.container_imagen}>
            <img src={image_login} alt="Imagen Login" />
        </div>
    );
};

export default LoginImage;