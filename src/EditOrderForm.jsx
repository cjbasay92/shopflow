import { useState } from 'react'

function EditOrderForm({
  editOrder,
  handleUpdateOrder
}) {
  const [customerName, setCustomerName] =
    useState(editOrder.customerName)

  const [product, setProduct] =
    useState(editOrder.product)

  const [quantity, setQuantity] =
    useState(editOrder.quantity)

  const [unitPrice, setUnitPrice] =
    useState(editOrder.unitPrice)

  const [status, setStatus] =
    useState(editOrder.status)

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedOrder = {
      id: editOrder.id,
      customerName,
      product,
      quantity,
      unitPrice,
      totalPrice: quantity * unitPrice,
      status
    }

    handleUpdateOrder(updatedOrder)
  }

  return (
    <form
      className="edit-order-form"
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

        <input
          type="text"
          value={product}
          onChange={(e) =>
            setProduct(e.target.value)
          }
        />
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
        Save Changes
      </button>
    </form>
  )
}

export default EditOrderForm
