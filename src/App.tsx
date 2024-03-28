import { useEffect, useReducer } from 'react';
import { RouterProvider } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';

import { GlobalContext, getFromStorage, KEY_TOKEN, reducer } from '@core';

import { router } from './app-routing.tsx';
import { fetchUser } from './apis/index.ts';
import { MyDialog } from '@components';

const App = () => {
  const [ { user, dialogPayload }, dispatch ] = useReducer(reducer, { user: null, dialogPayload: { display: false } });

  // 設定 Material-UI 的主題
  const theme = createTheme({
    typography: {
      fontFamily: '"Noto Sans TC", serif',
      fontSize: 16
    }
  });

  useEffect(() => {
    // 檢查 localStorage 是否有 token，有的話就取得使用者資料，並更新到 global state 中
    const token = getFromStorage(KEY_TOKEN, 'LOCAL');
    if ( token ) {
      fetchUser(token).then((user) => {
        dispatch({ type: 'SET_USER', payload: user });
      }).catch((err) => {
        console.log('get user err', err);
      });
    }
  }, []);

  return (
    <GlobalContext.Provider value={ { user, dialogPayload, dispatch } }>
      <ThemeProvider theme={ theme }>
        <RouterProvider router={ router } />
        <MyDialog />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default App;
