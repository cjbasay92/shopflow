import { useState } from 'react'
import AddOrderForm from './AddOrderForm'
import EditOrderForm from './EditOrderForm'

function Orders({ orders, setOrders, defaultOrderStatus, products, setProducts, currency }) {
 
  const [editOrder, setEditOrder] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState("All")
    const filteredOrders = selectedStatus === "All"
          ? orders
          : orders.filter(order => order.status === selectedStatus)

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) => {
      return prev.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status: newStatus
          }
        }

        return order
      })
    })
  }

  const handleEditOrder = (id) => {
    const order = orders.find(
      (order) => order.id === id
    )

    setEditOrder(order)
  }

  const handleDeleteOrder = (id) => {

  const order = orders.find(
    (order) => order.id === id
  )

  if (order === undefined) {
    return
  }

  setProducts(
    products.map(product => {

      if (product.name === order.product) {
        return {
          ...product,
          stock: product.stock + order.quantity
        }
      }

      return product
    })
  )

  setOrders((prev) => {
    return prev.filter(
      (order) => order.id !== id
    )
  })
}

  const handleAddOrder = (newOrder) => {
    const product = products.find(
      
      (product) => newOrder.product === product.name)

      if (product === undefined) {
      alert("Product not found")
      return
      }

      if (
        newOrder.quantity > product.stock ||
        newOrder.quantity <= 0
      ) {
        alert("Invalid quantity")
        return
      }
    setOrders((prev) => {
      return [
        ...prev,
        newOrder
      ]
    })
    setProducts(
    products.map(product => {
      if (product.name === newOrder.product) {
        return {
          ...product,
          stock: product.stock - newOrder.quantity
        }
      }

      return product
    })
  )
    
  }

  const handleUpdateOrder = (updatedOrder) => {

  const oldOrder = orders.find(
    (order) => order.id === updatedOrder.id
  )

  const newProduct = products.find(
    (product) => product.name === updatedOrder.product
  )

  if (newProduct === undefined) {
    alert("Product not found")
    return
  }

  if (updatedOrder.quantity <= 0) {
    alert("Invalid quantity")
    return
  }

  if (oldOrder.product !== updatedOrder.product) {

    if (updatedOrder.quantity > newProduct.stock) {
      alert("Not enough stock")
      return
    }

    setProducts(
      products.map(product => {

        if (product.name === oldOrder.product) {
          return {
            ...product,
            stock: product.stock + oldOrder.quantity
          }
        }

        if (product.name === updatedOrder.product) {
          return {
            ...product,
            stock: product.stock - updatedOrder.quantity
          }
        }

        return product
      })
    )

  } else {

    
    const difference =
      updatedOrder.quantity - oldOrder.quantity

    if (difference > newProduct.stock) {
      alert("Not enough stock")
      return
    }

    setProducts(
      products.map(product => {

        if (product.name === oldOrder.product) {
          return {
            ...product,
            stock: product.stock - difference
          }
        }

        return product
      })
    )
  }

  setOrders((prev) => {
    return prev.map((order) => {

      if (order.id === updatedOrder.id) {
        return updatedOrder
      }

      return order
    })
  })

  setEditOrder(null)
}


  return (
    <>
      <AddOrderForm
        handleAddOrder={handleAddOrder}
        defaultOrderStatus={defaultOrderStatus}
        products={products}
      />

      {editOrder && (
        <EditOrderForm
          editOrder={editOrder}
          handleUpdateOrder={handleUpdateOrder}
        />
      )}
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option>All</option>
        <option>Pending</option>
        <option>Processing</option>
        <option>Shipped</option>
        <option>Completed</option>
      </select>

      <div className="orders-list">

        
        {filteredOrders.map((order) => {
          return (
            <div
              className="order-card"
              key={order.id}
            >
              <h2>
                Order ID: {order.id}
              </h2>

              <p>
                Customer Name: {order.customerName}
              </p>

              <p>
                Product: {order.product}
              </p>

              <p>
                Quantity: {order.quantity}
              </p>

              <p className="total-price">
                Total Price: {currency}{order.totalPrice}
              </p>

              <p>
                Status: {order.status}
              </p>

              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(
                    order.id,
                    e.target.value
                  )
                }
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Completed</option>
              </select>
              

              <button
                onClick={() =>
                  handleEditOrder(order.id)
                }
              >
                Edit Order
              </button>

              <button
                onClick={() =>
                  handleDeleteOrder(order.id)
                }
              >
                Delete Order
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Orders

