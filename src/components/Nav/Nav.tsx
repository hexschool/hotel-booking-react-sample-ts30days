import './Nav.scss';

import { MouseEvent, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Menu, MenuItem } from '@mui/material';

import { GlobalContext, KEY_TOKEN } from '@core';

import whiteLogo from '@assets/images/logo_white.png';
import ProfileIcon from '@assets/icons/ic_Profile.svg?react';

/**
 * 導覽列的元件
 */
export const Nav = () => {
  const { pathname } = useLocation();
  const { user, dispatch } = useContext(GlobalContext);

  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 是否要顯示連結的按鈕們（在登入、註冊頁面不顯示）
  const showLinks = ![ '/login', '/registration' ].includes(pathname);

  // 是否要變透明（在首頁、房間頁面要變透明）
  const beTransparent = [ '/', '/room' ].includes(pathname);

  const navigate = useNavigate();

  // 開啟使用者選單
  const openMenu = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 關閉使用者選單時要做的事情
  const handleMenuClosed = () => {
    setAnchorEl(null);
  };

  // 前往我的帳戶頁面
  const goToMyAccount = () => {
    navigate('/my-account');
  };

  // 登出
  const logout = () => {
    localStorage.removeItem(KEY_TOKEN);
    dispatch({ type: 'SET_USER', payload: null });
  };

  return (
    <nav className={ beTransparent ? 'be-transparent' : 'secondary-bg' }>
      <div className="nav-container">
        <Link className="logo" to={ '/' }><img src={ whiteLogo } /></Link>
        { showLinks && (
          <ul className="links">
            <li><Link className="title" to={ '/room' }>客房旅宿</Link></li>
            <li>{ user
                  ? (
                    <>
                      <div className="user-wrapper" onClick={ openMenu }>
                        <span className="flex"><ProfileIcon />{ user.name }</span>
                      </div>
                      <Menu
                        anchorEl={ anchorEl }
                        open={ open }
                        onClose={ handleMenuClosed }
                        MenuListProps={ {
                          'aria-labelledby': 'basic-button'
                        } }
                        className="user-menu"
                      >
                      <MenuItem onClick={ goToMyAccount }>我的帳戶</MenuItem>
                      <MenuItem onClick={ logout }>登出</MenuItem>
                    </Menu>
                    </>
                  )
                  : <Link className="title" to={ '/login' }>會員登入</Link>
            }</li>
            <li><Link className="title button-like" to={ '/booking' }>立即訂房</Link></li>
          </ul>
        ) }
      </div>
    </nav>
  );
};
