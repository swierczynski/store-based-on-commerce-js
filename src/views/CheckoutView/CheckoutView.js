import React from 'react';
import CheckoutForm from '../../components/organisms/CheckoutForm/CheckoutForm';
import NavbarTemplate from '../../templates/NavbarTemplate/NavbarTemplate';


const CheckoutView = () => {
  return ( 
    <NavbarTemplate>
      <CheckoutForm />
    </NavbarTemplate>
   );
}
 
export default CheckoutView;