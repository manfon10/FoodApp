import React from 'react';
import { CategoryAdminList, CategoryAdminForm } from '../../../components';
import style from './CategoryAdmin.module.css';

const CategoryAdminHome = () => {
    return (
        <div className={style.container_category_admin}>
            <CategoryAdminList style={style} />
            <CategoryAdminForm style={style} />
        </div>
    );
};

export default CategoryAdminHome;