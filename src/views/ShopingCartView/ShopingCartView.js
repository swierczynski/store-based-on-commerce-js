import React from 'react';
import ShopingCart from '../../components/organisms/ShopingCart/ShopingCart';
import NavbarTemplate from '../../templates/NavbarTemplate/NavbarTemplate';


const ShopingCartView = () => {
  return ( 
    <NavbarTemplate>
      <ShopingCart />
    </NavbarTemplate>
   );
}
 
export default ShopingCartView;