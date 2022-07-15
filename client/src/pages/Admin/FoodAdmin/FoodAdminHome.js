import React from 'react';
import { FoodAdminList } from '../../../components';
import style from './FoodAdmin.module.css';

const FoodAdminHome = () => {
    return (
        <div>
            <FoodAdminList style={style}/>
        </div>
    );
};

export default FoodAdminHome;