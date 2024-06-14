import { useState } from 'react'
import {unstable_HistoryRouter as HistoryRouter, Navigate, Route, Routes} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import HomeTemplate from './template/HomeTemplate'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Detail from './pages/Detail/Detail'
import Register from './pages/Register/Register'
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile'
import Search from './pages/Search/Search'


import { store } from './redux/store'
import { Provider } from 'react-redux';
import ResponsiveItem from './template/ResponsiveItem'
import HomeMobile from './pages/Home/HomeMobile'
// import phải để lên đầu

export const routeLink:any = createBrowserHistory();

function App() {

  return (
    <>
      <Provider store={store}>
      <HistoryRouter history={routeLink}>
        <Routes>
          <Route path='' element={<HomeTemplate />}>
            <Route index element={<ResponsiveItem component={<Home />} mobileComponent={<HomeMobile />} />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='cart' element={<Cart />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='search' element={<Search />}></Route>
            <Route path='detail' >
              <Route path=':id' element={<Detail />}></Route>
            </Route>
            <Route path='*' element={<Navigate to={'/'}/>}></Route>

          </Route>
        </Routes>
      </HistoryRouter>
    </Provider>
     
    </>
  )
}

export default App
