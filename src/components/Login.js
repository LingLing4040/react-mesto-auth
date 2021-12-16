import React from 'react';

import { useHistory } from 'react-router-dom';
import * as Auth from '../utils/Auth.js';

function Login(props) {
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
        if (!userData.email || !userData.password) {
            return;
        }
        const { password, email } = userData;
        Auth.login(password, email)
            .then((res) => {
                if (res) {
                    setUserData({ email: '', password: '' });

                    props.handleLogin();
                    history.push('/');
                } else {
                    setUserData({
                        ...userData,
                        message: 'Что-то пошло не так!',
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='login'>
            <h1 className='login__title'>Вход</h1>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='email' className='login__label'>
                    <input
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Email'
                        className='login__input login__input_type_email'
                        required
                        value={userData.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor='password' className='login__label'>
                    <input
                        name='password'
                        id='password'
                        type='password'
                        placeholder='Пароль'
                        className='login__input login__input_type_password'
                        required
                        value={userData.password}
                        onChange={handleChange}
                    />
                </label>
                <button type='submit' className='login__button'>
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;
