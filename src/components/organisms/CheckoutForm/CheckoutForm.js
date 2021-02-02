import React, { useContext, useEffect, useState } from 'react';
import {Paper, Stepper, Step, StepLabel,CircularProgress, Divider} from '@material-ui/core';
import styles from './CheckoutForm.module.scss'
import AdressForm from './AdressForm/AdressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import Confirmation from './Confirmation/Confirmation';
import { ShopContext } from '../../../context/ShopContext';

const steps = ['Shiping address', 'Peyments details'];

const CheckoutForm = () => {
  const {generateToken, shopingCart, checkoutToken} = useContext(ShopContext)
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({})

  useEffect(()=> {
    generateToken(shopingCart.id, 'cart')
  }, [shopingCart])


  const next = (data) => {
    setShippingData(data)
    nextStep()
  }
  console.log(shippingData);

  const nextStep = ()=> {
    setActiveStep(prevValue => prevValue + 1)
  }
  const backStep = ()=> {
    setActiveStep(prevValue => prevValue - 1)
  }

  const selectForm = activeStep === 0 ? <AdressForm next={next} /> : <PaymentForm shippingData={shippingData}/>


  const Form = () => {
    return (
      <div>
        {selectForm}
      </div>
    )
  }

  return ( 
    <main>
      <Paper className={styles.paper}>
        <h3 className={styles.title}>Checkout</h3>
        <Stepper activeStep={activeStep}>
          {steps.map(step => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
    </main>
   );
}
 
export default CheckoutForm;