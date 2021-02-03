import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../../../context/ShopContext';
import { routes } from '../../../../routes';
import Button from '../../../atoms/Button/Button';

const Confirmation = () => {
  const { order } = useContext(ShopContext);
  console.log(order);
  return ( 
    <div>
      <h4>Thank you for your purchase, {order && order.merchant.business_name} </h4>
      <h4>Order reference: {order && order.id}</h4>
      <h4>Look up for our email which should apear in your inbox</h4>
      <h4>Don't worry all purchase data gonna be in there </h4>
      <Link to={routes.products}>
        <Button>Back to Homepage</Button>
      </Link>
    </div>
   );
}
 
export default Confirmation;