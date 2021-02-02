import React from 'react';
import ShopContextProvider from '../context/ShopContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';


const MainTemplate = ({children}) => {
  return ( 
    <ShopContextProvider>
      <Router>
        <Switch>
          {children}
        </Switch>
      </Router>
    </ShopContextProvider>
   );
}
 
export default MainTemplate;