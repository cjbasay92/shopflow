import { useState } from 'react'

function Settings({ storeName, setStoreName, storeEmail, setStoreEmail, storePhone,setStorePhone, currency, setCurrency, defaultOrderStatus, setDefaultOrderStatus}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        const settings = {
            storeName,
            storeEmail,
            storePhone,
            currency,
            defaultOrderStatus
        }

        localStorage.setItem("settings", JSON.stringify(settings))
    }

    return (
  <div className="settings-container">

    <div className="settings-header">
      <h1>{storeName}</h1>
      <p>{storeEmail}</p>
      <p>{storePhone}</p>
    </div>

    <form
      className="settings-form"
      onSubmit={handleSubmit}
    >

      <div>
        <label>Store Name</label>
        <input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </div>

      <div>
        <label>Store Email</label>
        <input
          placeholder="Store email"
          value={storeEmail}
          onChange={(e) => setStoreEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Store Phone</label>
        <input
          placeholder="Store phone number"
          value={storePhone}
          onChange={(e) => setStorePhone(e.target.value)}
        />
      </div>

      <div>
        <label>Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="₱">Philippine Peso</option>
          <option value="$">US Dollar</option>
        </select>
      </div>

      <div>
        <label>Default Order Status</label>
        <select
          value={defaultOrderStatus}
          onChange={(e) => setDefaultOrderStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button type="submit">
        Save Changes
      </button>

    </form>

  </div>
)
}

export default Settings