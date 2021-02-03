import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../../context/ShopContext';
import { routes } from '../../../routes';
import Button from '../../atoms/Button/Button';
import CartItem from '../../molecules/CartItem/CartItem';
import styles from './ShopingCart.module.scss'


const ShopingCart = () => {
  const { shopingCart, totalItems, handleEmptyCart } = useContext(ShopContext);

  const EmptyCart = () => (
    <>
    <h4>Your cart is empty start adding item in case of purchase</h4>
    <Link to={routes.products}><Button>Go back to store</Button></Link>
    </>
  )
  const FilledCart = () => (
    <div className={styles.filledCart}>
      <div className={styles.allCarts}>
        {allChoosenItems()}
      </div>
      <div>
        <div className={styles.subtotal}>
          <h4>Subtotal : {shopingCart.subtotal.formatted_with_symbol}</h4>
          <Button type='button' onClick={handleEmptyCart}>Empty cart</Button>
          <Link to={routes.checkout}>
            <Button type='button' secandary={true}>Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  )

  const isEmpty = () => {
    if(!totalItems) return <EmptyCart />
    return <FilledCart />
  }

  const isShopingCart = shopingCart ? isEmpty() : <p>is Loading...</p>


  

  const allChoosenItems = () => shopingCart.line_items.map(item => {
      return <CartItem key={item.id} {...item} />
    });

  return ( 
    <div className={styles.title}>
      <h3>Your shoping cart</h3>
      {isShopingCart}
    </div>
   );
}
 
export default ShopingCart;