import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext';
import { useUserContext } from '../context/UserContext';
// import { useAuthContext } from '../context/useAuthContext';

import { AiOutlineShopping, AiFillHome } from 'react-icons/ai'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { toast } from 'react-hot-toast';

import Cart from './Cart';

const Navbar = () => {
  const router = useRouter();
  const checkOutRoutes = ['/placeorder'];
  const { showCart, setShowCart, totalQuantities, darkMode, setDarkMode } = useStateContext();
  const { userInfo, userLogout }  = useUserContext();
  // const { netlifyUser, authReady, netlifyLogin, netlifyLogout }  = useAuthContext();
  
  const handleShowCart = () => {
    if (checkOutRoutes.includes(router.pathname)) {
      toast('Shopping cart cannot be changed on this page.', {icon: '❗'});
    } else {
      setShowCart(true);
    }
  }
  return (
    <div className="navbar-container">
      <Link href="/"><div className="logo">
        <AiFillHome color='white' size={30}/>
      </div></Link>
      <div className="user">
        <div className="button-container">
          {!userInfo &&
            <Link href={`/login`}><button type="button" className="btn">Login</button></Link>
          }
          {userInfo &&
            <Link href="/dashboard">{userInfo.name}</Link>
          }
          {userInfo &&
            <button type="button" className="btn" onClick={userLogout}>Log out</button>
          }
        </div>
        <div className="cart-icon-container">
          <button type="button" className="cart-icon" onClick={handleShowCart}>
          <AiOutlineShopping color='white'/>
          <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>
        <div className="switch">
          <BsMoonFill color={darkMode ? 'yellow' : 'white'} size={20} onClick={() => setDarkMode(true)}/>
          <BsSunFill color={darkMode ? 'white' : 'yellow'} size={20} onClick={() => setDarkMode(false)}/>
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar