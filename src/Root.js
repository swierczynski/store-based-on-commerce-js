import React from 'react';
import MainTemplate from './templates/MainTemplate';
import { Redirect, Route } from 'react-router-dom';
import {routes} from './routes'
import ShopingCartView from './views/ShopingCartView/ShopingCartView';
import ProductsView from './views/ProductsView/ProductsView';
import CheckoutView from './views/CheckoutView/CheckoutView';

const Root = () => {

  return ( 
    <MainTemplate>
      <Route exact path={routes.home} render={()=> <Redirect to={routes.products} />} />
      <Route exact path={routes.products} component={ProductsView} />
      <Route exact path={routes.cart} component={ShopingCartView} />
      <Route exact path={routes.checkout} component={CheckoutView} />
    </MainTemplate>
   );
}
 
export default Root;

