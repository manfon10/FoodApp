import React from 'react';
import { ProfileForm, ProfileOrders } from '../components';

const Option = ({ type, userInfo, style }) => {
    if (type === "ProfileForm") {
        return <ProfileForm userInfo={userInfo} style={style} />;
    }else if(type === "UserOrders") {
        return <ProfileOrders style={style}/>
    }else {
        return false;
    }
};

export default Option;