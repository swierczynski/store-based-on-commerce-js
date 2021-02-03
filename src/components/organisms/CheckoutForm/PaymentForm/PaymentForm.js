import React, { useContext } from 'react';
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; 
import Review from '../Review/Review';
import Button from '../../../atoms/Button/Button';
import styles from './PaymentForm.module.scss'
import { ShopContext } from '../../../../context/ShopContext';

const PaymentForm = ({backStep, nextStep, shippingData, checkoutToken}) => {

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const { handleCaptureCart } = useContext(ShopContext)

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if(!stripe || !elements) return 

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})

    if(error || !handleCaptureCart) return 

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email
      },
      shipping: {
        name: 'Primary',
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: {
        shipping_method: shippingData.shippingOption
      },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id
        }
      }
      
    }
    console.log(handleCaptureCart);
    handleCaptureCart(checkoutToken.id, orderData)
    nextStep()


  }

  return ( 
    <div>
      <Review />
      <h4>Payment method</h4>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {
            ({elements, stripe})=> {
              return (
                <form className={styles.form} onSubmit={e => handleSubmit(e, elements, stripe)}>
                  <CardElement />
                  <br/>
                  <br/>
                  <div>
                    <Button type='button' onClick={backStep}>Back</Button>
                    <Button type='submit' secandary disabled={!stripe}>Finalise purchase</Button>
                  </div>
                </form>
              )
            }
          }
        </ElementsConsumer>
      </Elements>
    </div>
   );
}
 
export default PaymentForm;