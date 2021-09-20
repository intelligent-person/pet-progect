import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/atom.svg'
import logout from '../../assets/images/logout.svg'

const Header = (props) => {
    return <header className={s.header}>
        <img className={s.icon} src={logo} />
        <div className={s.loginBlock}>
            { props.isAuth
                ? <div>{props.login} <button className={s.button} onClick={props.logout}><img className={s.logout} src={logout} alt="logout" title={'logout'}/></button></div>
                : <NavLink className={s.loginBlock} to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;