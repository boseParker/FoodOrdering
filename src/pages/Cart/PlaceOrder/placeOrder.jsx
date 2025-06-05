import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../../context/storeContext'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {

  const navigate=useNavigate()
  const { getTotalcartAmount, cartItems, food_list } = useContext(StoreContext)

  const [address, setAddress] = useState({
    first_name: '',
    last_name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone: ''
  })

  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('credit_card')

  const getAccessToken = () => localStorage.getItem("access_token")
  const getRefreshToken = () => localStorage.getItem("refresh_token")

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) throw new Error("No refresh token available")

    const res = await fetch('https://brutus-food-backend.onrender.com/api/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken })
    })

    if (!res.ok) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      throw new Error("Refresh token expired or invalid")
    }

    const data = await res.json()
    localStorage.setItem("access_token", data.access)
    return data.access
  }

  const fetchWithAuth = async (url, options = {}) => {
    let accessToken = getAccessToken()
    if (!options.headers) options.headers = {}
    options.headers['Authorization'] = `Bearer ${accessToken}`
    options.headers['Content-Type'] = 'application/json'

    let res = await fetch(url, options)
    if (res.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken()
        options.headers['Authorization'] = `Bearer ${newAccessToken}`
        res = await fetch(url, options)
        return res
      } catch (error) {
        alert("Session expired. Please login again.")
        throw error
      }
    }
    return res
  }

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetchWithAuth('https://brutus-food-backend.onrender.com/api/address/', { method: 'GET' })
        if (res.ok) {
          const data = await res.json()
          setAddress(data)
        }
      } catch (error) {
        console.error("Error fetching address:", error)
      }
    }
    fetchAddress()
  }, [])

  const handleChange = (e) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const res = await fetchWithAuth('https://brutus-food-backend.onrender.com/api/address/', {
        method: 'POST',
        body: JSON.stringify(address)
      })
      if (res.ok) alert("✅ Address saved successfully")
      else alert("❌ Failed to save address")
    } catch (error) {
      alert("⚠️ Error saving address")
    }
  }

  const handlePaymentClick = () => {
    setShowPayment(true)

  }

  // Prepare order data with flattened address and cart items array
  const prepareOrderData = () => {
    const {
      first_name, last_name, email, street, city,
      state, zip_code, country, phone
    } = address

    // Convert cartItems object to array of order items with product info
    // Assuming cartItems is an object: { productId: quantity }
    // and food_list contains product info array with _id, name, price
    const items = Object.entries(cartItems).map(([productId, quantity]) => {
      const product = food_list.find(item => item._id === productId)
      return {
        product: productId,
        product_name: product ? product.name : "Unknown",
        quantity,
        price: product ? product.price : 0
      }
    })

    return {
      first_name,
      last_name,
      email,
      street,
      city,
      state,
      zip_code,
      country,
      phone,
      total_amount: getTotalcartAmount(),
      payment_method: paymentMethod,
      items
    }
  }

  const handlePaymentSubmit = async () => {
    const orderData = prepareOrderData()

    try {
      const res = await fetchWithAuth('https://brutus-food-backend.onrender.com/api/orders/', {
        method: 'POST',
        body: JSON.stringify(orderData)
      })

      if (res.ok) {
        alert("Order placed successfully. Confirmation email was sent.")
        navigate('/my-orders')
        
      } else {
        const errData = await res.json()
        console.error("Order failed:", errData)
        alert("Failed to place order")
      }
    } catch (err) {
      alert('Error placing order')
    }
  }

  return (
    <div>
      <form className="place-order d-flex flex-column flex-sm-row align-items-start justify-content-between gap-5" onSubmit={handleSave}>
        <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
            <input type="text" name="first_name" placeholder='First name' value={address.first_name} onChange={handleChange} required />
            <input type="text" name="last_name" placeholder='Last name' value={address.last_name} onChange={handleChange} required />
          </div>
          <input type="email" name="email" placeholder='Email address' value={address.email} onChange={handleChange} required />
          <input type="text" name="street" placeholder='Street' value={address.street} onChange={handleChange} required />
          <div className="multi-fields">
            <input type="text" name="city" placeholder='City' value={address.city} onChange={handleChange} required />
            <input type="text" name="state" placeholder='State' value={address.state} onChange={handleChange} required />
          </div>
          <div className="multi-fields">
            <input type="text" name="zip_code" placeholder='Zip code' value={address.zip_code} onChange={handleChange} required />
            <input type="text" name="country" placeholder='Country' value={address.country} onChange={handleChange} required />
          </div>
          <input type="text" name="phone" placeholder='Phone' value={address.phone} onChange={handleChange} required />
          <div className='Save-button'>
            <button type="submit" className='py-2 px-5'>Save</button>
          </div>
        </div>

        <div className='place-order-right'>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart totals</h2>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>${getTotalcartAmount()}</p>
              </div>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>${getTotalcartAmount() === 0 ? 0 : 5}</p>
              </div>
              <div className='cart-total-details'>
                <b>Total</b>
                <p>${getTotalcartAmount() === 0 ? 0 : getTotalcartAmount() + 5}</p>
              </div>
              {!showPayment ? (
                <button type="button" onClick={handlePaymentClick}>PROCEED TO PAYMENT</button>
              ) : (
                <div>
                  <h3>Select Payment Method</h3>
                  <div>
                    <label>Credit Card</label>
                    <input type="radio" name='payment' value="credit_card" checked={paymentMethod === 'credit_card'} onChange={e => setPaymentMethod(e.target.value)} />
                  </div>
                  <div>
                    <label>GPay</label>
                    <input type="radio" name='payment' value="gpay" checked={paymentMethod === 'gpay'} onChange={e => setPaymentMethod(e.target.value)} />
                  </div>
                  <div>
                    <label>Cash</label>
                    <input type="radio" name='payment' value="cash" checked={paymentMethod === 'cash'} onChange={e => setPaymentMethod(e.target.value)} />
                  </div>
                  <button type='button' onClick={handlePaymentSubmit}>Confirm Payment & Place Order</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
