import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategoryThunk, getCategoriesThunk, updateCategoryThunk, deleteCategoryThunk } from '../../../redux/actions';

const CategoryAdminList = ({ style }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, [dispatch]);

    const { categoryList } = useSelector( state => state.categories );

    return (
        <div className={style.container_category_add}>
            <table className={style.table_categories}>
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </thead>
                <tbody className={style.table_tbody_category}>
                    {
                        categoryList.map( category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button
                                    onClick={ () => navigate(`/admin_categories/update/${category.id}`) }
                                        className={style.category_button_edit}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button 
                                        onClick={ () => dispatch(deleteCategoryThunk(category.id))}
                                        className={style.category_button_delete}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CategoryAdminList;