import Input  from '../../../atoms/Input/Input'
import Button from '../../../atoms/Button/Button'
import React, { useContext, useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import styles from './AdressForm.module.scss'
import { ShopContext } from '../../../../context/ShopContext';
import { Link } from 'react-router-dom';
import {routes} from '../../../../routes'

const AdressForm = ({next}) => {
  
  const { register, handleSubmit} = useForm();
  const {checkoutToken, fetchShippingCountries, fetchShippingSubdivisions, fetchShippingOptions} = useContext(ShopContext)
  let countries = null
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  let subdivisions = null
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  let options = null;
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')

  const onSubmit = (data)=> {
    next({...data, shippingCountry, shippingSubdivision, shippingOption});
  }
  const getDataCountries = async()=> {
      countries = await fetchShippingCountries(checkoutToken.id)
      countries = Object.entries(countries).map(([code, name]) => ({id: code, label: name}))
      setShippingCountries(countries)
      setShippingCountry(countries[1].id)
  }

  useEffect(()=> {
    if(checkoutToken && fetchShippingCountries) {
      getDataCountries()
    }
  },[])

  const getSubdivisionData = async() => {
    subdivisions = await fetchShippingSubdivisions(shippingCountry)
    subdivisions = Object.entries(subdivisions).map(([code, name]) => (
      {id: code, label: name}
    ))
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(subdivisions[0].id)
  }


  useEffect(()=> {
    if(shippingCountry) {
      getSubdivisionData()
    }
  }, [shippingCountry])


  const getOptionsData = async() => {
    options = await fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }


  useEffect(()=> {
    if(shippingSubdivision) {
      getOptionsData()
    }
  }, [shippingSubdivision])
  

  return ( 
    <div className={styles.form}>
      <h4>Shiping adress</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.selectors}>
          <Input type="text" name='firstName' reference={register} required placeholder='Your First Name'/>
          <Input type="text" name='lastName' reference={register} placeholder='Your Last Name'/>
          <Input type="text" name='address1' reference={register} placeholder='Your address'/>
          <Input type="email" name='email' reference={register} placeholder='Your email'/>
          <Input type="text" name='city' reference={register} placeholder='Your city'/>
          <Input type="text" name='zip' reference={register} placeholder='Your ZIP / Postal code'/>
          <div className={styles.selector}>
            <label> Shipping Country:</label>
            <select value={shippingCountry} onChange={e => setShippingCountry(e.target.value)}>
              {shippingCountries.map(country => (
                <option key={country.id} value={country.id}>{country.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.selector}>
            <label> Shipping Subdivision:</label>
            <select value={shippingSubdivision} onChange={e => setShippingSubdivision(e.target.value)}>
              {shippingSubdivisions.map(subdivision => (
                <option value={subdivision.id}>{subdivision.label}</option>
              ))}
            </select>
          </div>
          <div className={styles.selector}>
            <label> Shipping Option:</label>
            <select value={shippingOption} onChange={e => setShippingOption(e.target.value)}>
              {shippingOptions.map(shippingOption => (
                <option value={shippingOption.id}>{shippingOption.description} - {shippingOption.price.formatted_with_symbol}</option>
              ))}
            </select>
          </div>
        </div>
        <Link to={routes.cart}>
          <Button type='button'>Back to Cart</Button>
        </Link>
        <Button secandary type='submit'>Next</Button>
      </form>
    </div>
   );
}
 
export default AdressForm;