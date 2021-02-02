import React from 'react';
import Navbar from '../../components/organisms/Navbar/Navbar';
import styles from './NavbarTemplate.module.scss'

const NavbarTemplate = ({children}) => {

  return ( 
    <div className={styles.wrapper}>
      <aside>
        <Navbar />
      </aside>
      <main>
        {children}
      </main>
    </div>
   );
}
 
export default NavbarTemplate;