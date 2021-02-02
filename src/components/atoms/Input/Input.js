import React from 'react';
import styles from './Input.module.scss'

const Input = ({type='text', reference, name, value, onChange, placeholder,required}) => {
  return ( 
    <input className={styles.input} placeholder={placeholder} type={type} ref={reference({required})} name={name} value={value} onChange={onChange}/>
   );
}
 
export default Input;