import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { LoginLayout } from '@components';
import { LOGIN_SCHEMA } from '@constants';
import { LoginForm } from '@types';
import { login } from '../../apis';
import { GlobalContext } from '@core';

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<LoginForm>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    resolver: yupResolver(LOGIN_SCHEMA),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const OnSubmit: SubmitHandler<LoginForm> = (data) => {
    login(data).then((res) => {
      dispatch({ type: 'SET_USER', payload: res });
      navigate('/');
    }).catch((err: Error) => {
      dispatch({
        type: 'SET_DIALOG',
        payload: {
          display: true,
          title: '登入失敗',
          content: err.message,
          showReject: false,
          autoFocus: 'accept'
        }
      });
    });
  };

  return (
    <LoginLayout>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
      <form onSubmit={ handleSubmit(OnSubmit) }>
        <div className="field">
          <p className="title">享樂酒店，誠摯歡迎</p>
          <h1>立即開始旅程</h1>
        </div>
        <div className="input">
          <label className="title">電子郵件</label>
          <input
            { ...register('email') }
            type="email"
            placeholder="hello@exsample.com"
            className="body"
          />
          <p className="tiny error">{ errors.email?.message }</p>
        </div>
        <div className="input">
          <label className="title">密碼</label>
          <input
            { ...register('password') }
            type="password"
            placeholder="請輸入密碼"
            className="body"
          />
          <p className="tiny error">{ errors.password?.message }</p>
        </div>
        <div className="flex field">
          <div>
            <input type="checkbox" id="remember" /><label htmlFor="remember">記住帳號</label>
          </div>
          <Link className="title" to="/forgot-password">忘記密碼</Link>
        </div>
        <div><button
          type="submit"
          className="button-like"
          disabled={ !isValid }
        >會員登入</button></div>
        <div className="body">沒有會員嗎？ <Link className="title" to="/registration">前往註冊</Link></div>
      </form>
    </LoginLayout>
  )
    ;
};

export default Login;
