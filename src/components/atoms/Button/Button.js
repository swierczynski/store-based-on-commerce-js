import React, { useEffect, useRef } from 'react';
import styles from './Button.module.scss'

const Button = ({children, onClick, type='button', secandary, disabled}) => {

  const buttonRef = useRef(null);

  const spanActivation = e => {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement('span')
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    buttonRef.current.appendChild(ripples)

    setTimeout(()=> {
      ripples.remove()
    }, 1000)
}


  const handleOnClick = (e) => {
    spanActivation(e);
    if(onClick) {
      onClick()
    }
  }


  return ( 
    <div className={styles.wrapper}>
    <button ref={buttonRef} disabled={disabled} onClick={e => handleOnClick(e)} type={type} className={secandary ? styles.secandaryButton : styles.button}>{children}</button>
    </div>
   );
}
 
export default Button;







/* 
useEffect(()=> {

    const spanActivation = e => {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;

      let ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      buttonRef.current.appendChild(ripples)

      setTimeout(()=> {
        ripples.remove()
      }, 1000)
    } 

    buttonRef.current.addEventListener('click', spanActivation)

    return () => {
      buttonRef.current.removeEventListener('click', spanActivation)
    }
  }, [])
*/