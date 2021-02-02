import React, { useContext } from 'react';
import Card from '../../components/molecules/Card/Card';
import { ShopContext } from '../../context/ShopContext';
import NavbarTemplate from '../../templates/NavbarTemplate/NavbarTemplate';
import styles from './ProductView.module.scss'

const ProductsView = () => {

  const {products} = useContext(ShopContext);

  const allProducts = products.map(product => <li> <Card key={product.id} {...product} /> </li>)

  return ( 
    <NavbarTemplate>
      <ul className={styles.productList}>
        {allProducts}
      </ul>
    </NavbarTemplate>
   );
}
 
export default ProductsView;


