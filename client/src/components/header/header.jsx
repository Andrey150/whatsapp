import React from 'react';
import {NavLink} from "react-router-dom";
import './header.css'
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../../reducers/useReducer";

const Header = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();
  console.log('header', isAuth)
  return (
    <div className='header'>
      <div className="logo">WhatsApp clone</div>
      <div className="control">
        {!isAuth && <div className="login"><NavLink to='/login'>Войти</NavLink></div> }
        {!isAuth && <div className="reg"><NavLink to='/registration'>Зарегестрироваться</NavLink></div> }
        {isAuth && <div className="login" onClick={() => dispatch(logout())}>Выйти</div> }
      </div>
    </div>
  );
};

export default Header;