import React from 'react'
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import { useAuthContext } from '../context/AuthContext';

import { AiOutlineShopping, AiFillHome } from 'react-icons/ai'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, darkMode, setDarkMode } = useStateContext();
  const { user, login, logout, authReady }  = useAuthContext();

  return (
    <div className="navbar-container">
      <Link href="/"><div className="logo">
        <AiFillHome color='white' size={30}/>
      </div></Link>
      <div className="user">
        <div className='switch'>
          <BsMoonFill color={darkMode ? 'yellow' : 'white'} size={20} onClick={() => setDarkMode(true)}/>
          <BsSunFill color={darkMode ? 'white' : 'yellow'} size={20} onClick={() => setDarkMode(false)}/>
        </div>
        {authReady && (
          <ul>
            {!user && <li onClick={login} className="btn">Login/Signup</li>}
            {user && <Link href="/dashboard"><li>{user.email}</li></Link>}
            {user && <li onClick={logout} className="btn">Log out</li>}
          </ul>
        )}
        <div className="cart-icon-container">
          <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping color='white'/>
          <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar