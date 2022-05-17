import React from 'react'
import { AiOutlineShopping, AiFillHome } from 'react-icons/ai'
import Cart from './Cart';


import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();


  return (
    <div className="navbar-container">
      <Link href="/"><div className="logo">
        <AiFillHome color={'white'} size={30}/>
      </div></Link>
      <div className="user">
        <div className="cart-icon-container">
          <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping color={'white'}/>
          <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar