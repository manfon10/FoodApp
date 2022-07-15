import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileNav, ProfileForm } from '../../components';
import Option from '../../utils/Option';
import style from './Profile.module.css';

const Profile = () => {

    const { userInfo } = useSelector( state => state.user );

    const [ type, setType ] = useState("ProfileForm");

    return (
        <div className={style.container_profile_user}>
            <ProfileNav userInfo={userInfo} style={style} setType={setType}/>
            <div className={style.container_data_user}>
                <Option type={type} userInfo={userInfo} style={style}/>
            </div>
        </div>
    );
};

export default Profile;