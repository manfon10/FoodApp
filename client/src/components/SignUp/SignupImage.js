import React from 'react';
import image_singup from '../../assets/components/imagen_signup.PNG';

const SignupImage = ({ style }) => {
    return (
        <div className={style.container_imagen}>
            <img src={image_singup} alt="Imagen Signup" />
        </div>
    );
};

export default SignupImage;