import React, { useRef } from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import { useUserContext } from '../context/UserContext';

const Menu = () => {
  const menutRef = useRef();
  const { setShowCMenu } = useStateContext();
  const { userLogout }  = useUserContext();
  return (
    <div className="menu-wrapper" ref={menutRef}>
      <div className="menu-container">
        <ul>
          <Link href='/profile'><li onClick={() => setShowCMenu(false)}>Profile</li></Link>
          <Link href='/order-history'><li onClick={() => setShowCMenu(false)}>OrderHistory</li></Link>
          <li onClick={userLogout}>Logout</li>
        </ul>

      </div>
    </div>
  )
}

export default Menu