import React, { useContext, useState } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import Button from '../../atoms/Button/Button';
import styles from './Card.module.scss'

const Card = (props) => {

  const { handleAddToCart } = useContext(ShopContext)

  return ( 
    <div className={styles.outsideWrapper}>
      <div className={styles.cardWrapperInside}>
          <h2>{props.name}</h2>
          <div className={styles.imageWrapper}>
          <img src={props.media.source} alt={props.name}/> 
          </div>
          <p dangerouslySetInnerHTML={{ __html: props.description}} ></p>
          <p className={styles.price}>{props.price.formatted_with_symbol}</p>
          <Button secandary onClick={()=> handleAddToCart(props.id, 1)}>Add to card</Button>
      </div>
    </div>
   );
}
 
export default Card;