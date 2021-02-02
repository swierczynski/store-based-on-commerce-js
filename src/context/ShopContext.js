import React, { createContext, useState, useEffect } from 'react';
import { commerce } from '../lib/commerce'

export const ShopContext = createContext();


const ShopContextProvider = ({children}) => {

  const [products, setProducts] = useState([])
  const [shopingCart, setShopingCart] = useState({})
  const [checkoutToken, setCheckoutToken ] = useState(null)



  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data)
  }

  const fetchShopingCart = async() => {
    const cart = await commerce.cart.retrieve()
    setShopingCart(cart)
  }
  const handleAddToCart = async(productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setShopingCart(item.cart)
  }

  const handleUpdateCartQuantity = async(productId, quantity)=> {
    const item = await commerce.cart.update(productId, { quantity } )
    setShopingCart(item.cart)
  }
  const handleRemoveFormCart = async(productId)=> {
    const item = await commerce.cart.remove(productId);

    setShopingCart(item.cart)
  }
  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty()

    setShopingCart(item.cart)
  }
  const fetchShippingCountries = async(checkoutTokenId)=> {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
    return countries
  }
  const fetchShippingSubdivisions = async(countryCode) => {
    const response = await commerce.services.localeListSubdivisions(countryCode)
    return response.subdivisions
  }

  const generateToken = async(shopingCartId, type)=> {
      const token = await commerce.checkout.generateToken(shopingCartId, { type })
      setCheckoutToken(token)
  }

  const fetchShippingOptions = async(checkoutTokenId, countryCode, subdivisionCode = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
      country: countryCode,
      region: subdivisionCode
    })
    return options
  }

  useEffect(()=> {
    fetchProducts()
    fetchShopingCart()
  }, [])

  return ( 
    <ShopContext.Provider value={{products, handleAddToCart, totalItems: shopingCart.total_items, shopingCart, handleEmptyCart, handleRemoveFormCart, handleUpdateCartQuantity, fetchShippingCountries, generateToken, fetchShippingSubdivisions, checkoutToken, fetchShippingOptions}}>
      {children}
    </ShopContext.Provider>
   );
}
 
export default ShopContextProvider;