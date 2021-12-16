import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Auth from './Auth.js';

function Register({ handleInfoOpen }) {
    const history = useHistory();

    const [userData, setUserData] = React.useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { password, email } = userData;
        Auth.register(password, email).then((res) => {
            if (res) {
                handleInfoOpen(true);
                history.push('/sign-in');
            } else {
                handleInfoOpen(false);
                setUserData({
                    ...userData,
                    message: 'Что-то пошло не так!',
                });
            }
        });
    }

    return (
        <>
            <div className='register'>
                <h1 className='register__title'>Регистрация</h1>
                <form className='register__form' onSubmit={handleSubmit}>
                    <label htmlFor='email' className='register__label'>
                        <input
                            name='email'
                            id='email'
                            type='email'
                            placeholder='Email'
                            className='register__input register__input_type_email'
                            required
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor='password' className='register__label'>
                        <input
                            name='password'
                            id='password'
                            type='password'
                            placeholder='Пароль'
                            className='register__input register__input_type_password'
                            required
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <button type='submit' className='register__button'>
                        Зарегистрироваться
                    </button>
                </form>
                <Link to='/sign-in' className='register__link'>
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </>
    );
}

export default Register;
