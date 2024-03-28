import { ReactNode } from 'react';

import './LoginLayout.scss';

import { Nav } from '../Nav/Nav.tsx';

import BgImage from '@assets/images/login_bg.png';

/**
 * 登入/註冊頁面共用的 Layout
 *
 * @param {ReactNode} children - 子元件
 */
export const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Nav />
      <div className="layout-container secondary-bg flex">
        <div className="flex">
          <img src={ BgImage } />
        </div>
        <div className="flex">
          <div className="login-form-container">{ children }</div>
        </div>
      </div>
    </>
  );
};
