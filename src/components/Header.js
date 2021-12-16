import React from 'react';
import logoPath from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className='header'>
            <img className='header__logo' src={logoPath} alt='Логотип Mesto' />
            <div className='header__link-container'>
                {props.children}
                <Link className='header__link' to={props.linkPath} onClick={props.handleLogout}>
                    {props.linkText}
                </Link>
            </div>
        </header>
    );
}

export default Header;
