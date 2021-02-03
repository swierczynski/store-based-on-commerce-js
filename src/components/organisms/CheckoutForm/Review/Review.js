import React, { useContext } from 'react';
import { ShopContext } from '../../../../context/ShopContext';
import styles from './Review.module.scss'

const Review = () => {

  const { checkoutToken } = useContext(ShopContext)
  console.log(checkoutToken);
  return ( 
    <div>
      <h4>Order summary</h4>
      <ul className={styles.list}>
        {checkoutToken.live.line_items.map(item => (
          <li key={item.id}>
            <div>
              <div>
                <img src={item.media.source} alt={item.name}/>
              </div>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price : {item.line_total.formatted_with_symbol}</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h4>Total price: {checkoutToken.live.subtotal.formatted_with_symbol}</h4>
      </div>
    </div>
   );
}
 
export default Review;