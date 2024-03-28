import './MyAccount.scss';

import { useContext } from 'react';

import { GlobalContext } from '@core';

import UserAvatar from '@assets/icons/user-avatar.svg?react';
import Button from '@mui/material/Button';

const MyAccount = () => {
  const { user } = useContext(GlobalContext);

  if ( !user ) return (
    <>Error</>
  );

  const date = new Date(user.birthday);
  const birthday = `${ date.getFullYear() } 年 ${ date.getMonth() + 1 } 月 ${ date.getDate() } 日`;
  const address = `${ user.address.city }${ user.address.county }${ user.address.detail }`;

  return (
    <>
      <div className="banner main-spacing">
        <h1><UserAvatar />Hello，{ user.name }</h1>
      </div>
      <div className="my-account-container secondary-bg">
        <ul className="tabs">
          <li className="title">個人資料</li>
          <li className="title">我的訂單</li>
        </ul>
        <div className="my-account-content-wrapper">
          <div className="card pwd">
            <h5>修改密碼</h5>
            <div className="field">
              <p className="body">電子信箱</p>
              <p className="title">{ user.email }</p>
            </div>
            <div className="field">
              <p className="body">密碼</p>
              <p className="title">**********
                <span className="link-like">重設</span>
              </p>
            </div>
          </div>
          <div className="card personal">
            <h5>基本資料</h5>
            <div className="field">
              <p className="body">姓名</p>
              <p className="title">{ user.name }</p>
            </div>
            <div className="field">
              <p className="body">手機號碼</p>
              <p className="title">{ user.phone }</p>
            </div>
            <div className="field">
              <p className="body">生日</p>
              <p className="title">{ birthday }</p>
            </div>
            <div className="field">
              <p className="body">地址</p>
              <p className="title">{ address }</p>
            </div>
            <div className="button-area">
              <Button className="secondary">
                <span className="title">編輯</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-line"></div>
    </>
  );
};

export default MyAccount;
