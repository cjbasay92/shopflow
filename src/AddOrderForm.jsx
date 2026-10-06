import { useState } from 'react'

function AddOrderForm({ handleAddOrder, defaultOrderStatus, products }) {
  const [customerName, setCustomerName] = useState('')
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [status, setStatus] = useState(defaultOrderStatus)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newOrder = {
      id: Date.now(),
      customerName,
      product,
      quantity,
      unitPrice,
      totalPrice: quantity * unitPrice,
      status
    }

    handleAddOrder(newOrder)

    setCustomerName('')
    setProduct('')
    setQuantity('')
    setUnitPrice('')
    setStatus('')
  }


  return (
    <form
      className="order-form"
      onSubmit={handleSubmit}
    >
      <div>
        <label>Customer Name:</label>

        <input
          type="text"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
        />
      </div>

      <div>
        <label>Product Name:</label>

        <select
        value={product}
        onChange={(e) => setProduct(e.target.value)}>
          <option value="">Select a product</option> 
          {products.map((product) => {
            return (
            <option key={product.id}>
              {product.name}
            </option>
          )
          })}
        </select>
      </div>

      <div>
        <label>Quantity:</label>

        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value === ''
                ? ''
                : parseFloat(e.target.value)
            )
          }
        />
      </div>

      <div>
        <label>Unit Price:</label>

        <input
          type="number"
          value={unitPrice}
          onChange={(e) =>
            setUnitPrice(
              e.target.value === ''
                ? ''
                : parseFloat(e.target.value)
            )
          }
        />
      </div>

      <div>
        <label>Total Price:</label>

        <p>
          {quantity * unitPrice}
        </p>
      </div>

      <div>
        <label>Status:</label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="">
            Select Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      <button type="submit">
        Add Order
      </button>
    </form>
  )
}

export default AddOrderForm

