import React from 'react'
import { AiOutlineShopping, AiFillHome } from 'react-icons/ai'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import Cart from './Cart';

import Link from 'next/link';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, setDarkMode } = useStateContext();

  const onChangeValue = (e) => {
    e.target.value === 'dark-mode-on' ? setDarkMode(true) : setDarkMode(false)
  }

  return (
    <div className="navbar-container">
      <Link href="/"><div className="logo">
        <AiFillHome color='white' size={30}/>
      </div></Link>
      <div className="user">
        <div className='switch' onChange={onChangeValue}>
          <input type="radio" name="dark-mode" value="dark-mode-on" />
          <BsMoonFill color='white' size={20} />
          <input type="radio" name="dark-mode" value="dark-mode-off" />
          <BsSunFill color='white' size={20}/>
        </div>
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