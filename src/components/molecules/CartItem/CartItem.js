import React, { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Button from '../../atoms/Button/Button';
import styles from './CartItem.module.scss';

const CartItem = ({media, name, line_total, quantity, id,}) => {


  const {handleUpdateCartQuantity, handleRemoveFormCart} = useContext(ShopContext);

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={media.source} alt={name} />
      </div>
      <div>
        <h4>{name}</h4>
        <p>{line_total.formatted_with_symbol}</p>
      </div>
      <div className={styles.buttons}>
        <Button type='button' onClick={()=> handleUpdateCartQuantity(id, quantity - 1)}>-</Button>
        <p>{quantity}</p>
        <Button type='button' onClick={()=> handleUpdateCartQuantity(id, quantity + 1)}>+</Button>
      </div>
      <Button type='button' onClick={()=> handleRemoveFormCart(id)}>Remove</Button>
    </div>
   );
}
 
export default CartItem;
