import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '../../../routes';
import styles from './Navbar.module.scss';
import logo from '../../../assets/commerce.png';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ShopContext } from '../../../context/ShopContext';

const Navbar = () => {

  const {totalItems} = useContext(ShopContext);
  const location = useLocation()

  const isProduct = location.pathname === routes.products || location.pathname === routes.product

  return ( 
    <nav className={styles.navbar}>
      <NavLink to={routes.home}>
        <img src={logo} alt="e-commerce shop"/>
      </NavLink>
      <ul>
        { isProduct && (
            <li>
              <NavLink to={routes.cart}>
                <AiOutlineShoppingCart />
                  {totalItems > 0 && 
                    <div className={styles.totalItems}>{totalItems}</div>
                  }
              </NavLink>
            </li>
          )} 
      </ul>
    </nav>
   );
}
 
export default Navbar;