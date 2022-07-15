import React from 'react';
import { SignupForm, SignupImage } from '../../components';
import style from './Signup.module.css';

const SignUp = () => {
    return (
        <div className={style.container_signup}>
            <SignupImage style={style} />
            <SignupForm style={style} />
        </div>
    );
};

export default SignUp;