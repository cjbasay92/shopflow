import { useEffect, useState } from 'react'
import Orders from './Orders'
import Settings from './Settings'
import './App.css'

function ProductFilters({
  searchProduct,
  setSearchProduct,
  selectedCategory,
  setSelectedCategory
}) {
  return (
    <div className="product-filters">
      <input
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        type="text"
        placeholder="Search products..."
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Accessories">Accessories</option>
        <option value="Clothing">Clothing</option>
        <option value="Home">Home</option>
      </select>
    </div>
  )
}

function ProductList({
  products,
  setProducts,
  setEditProductId,
  currency
}) {
  const handleEditProduct = (id) => {
    setEditProductId(id)
  }

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?")
    if(confirmed){
      setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    )
    }
    
  }

  return (
    <div className="product-list">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h2>{product.name}</h2>

            <p>Category: {product.category}</p>

            <p>Price: {currency}{product.price}</p>

            <p
              className={
                product.stock > 5
                  ? 'in-stock'
                  : product.stock > 0
                    ? 'low-stock'
                    : 'out-of-stock'
              }
            >
              Stock: {product.stock}
            </p>

            <div className="product-actions">
              <button
                onClick={() => handleEditProduct(product.id)}
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function AddProductForm({
  setProducts,
  productName,
  setProductName,
  category,
  setCategory,
  price,
  setPrice,
  stock,
  setStock,
  editProductId,
  setEditProductId
}) {
  const handleAddProduct = (e) => {
    e.preventDefault()

    if (editProductId === null) {
      const newProduct = {
        id: Date.now(),
        name: productName,
        category: category,
        price: price,
        stock: stock
      }

      setProducts((prevProducts) => [
        ...prevProducts,
        newProduct
      ])
    } else {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product.id === editProductId) {
            return {
              id: product.id,
              name: productName,
              category: category,
              price: price,
              stock: stock
            }
          }

          return product
        })
      )
    }

    setEditProductId(null)
    setProductName('')
    setCategory('')
    setPrice(0)
    setStock(0)
  }

  return (
    <form
      className="product-form"
      onSubmit={handleAddProduct}
    >
      <div>
        <label>Category:</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>
      </div>

      <div>
        <label>Product Name:</label>

        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <div>
        <label>Price:</label>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Stock:</label>

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <button type="submit">
        {editProductId === null
          ? 'Add Product'
          : 'Save Changes'}
      </button>
    </form>
  )
}

function App() {

  const [storeName, setStoreName] = useState(
  (JSON.parse(localStorage.getItem("settings")) || { storeName: "ShopFlow" }).storeName)

  const [storeEmail, setStoreEmail] = useState((JSON.parse(localStorage.getItem("settings")) || { storeEmail: "" }).storeEmail)

  const [storePhone, setStorePhone] = useState((JSON.parse(localStorage.getItem("settings")) || { storePhone: "" }).storePhone)

  const [currency, setCurrency] = useState(((JSON.parse(localStorage.getItem("settings")) || { currency: "₱" }).currency))

  const [defaultOrderStatus, setDefaultOrderStatus] = useState("Pending")

  const [activeSection, setActiveSection] =
    useState('Dashboard')

  const [selectedCategory, setSelectedCategory] =
    useState('All')

  const [searchProduct, setSearchProduct] =
    useState('')

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 29,
      stock: 9
    },
    {
      id: 2,
      name: 'Sunglasses',
      category: 'Accessories',
      price: 19,
      stock: 5
    },
    {
      id: 3,
      name: 'Jacket',
      category: 'Clothing',
      price: 12,
      stock: 10
    },
    {
      id: 4,
      name: 'Desk Lamp',
      category: 'Home',
      price: 15,
      stock: 3
    }
  ])

  const [orders, setOrders] = useState([
  {
    id: 1,
    customerName: 'Cj',
    product: 'Laptop',
    quantity: 1,
    unitPrice: 1000,
    totalPrice: 1000,
    status: 'Pending'
  },
  {
    id: 2,
    customerName: 'John',
    product: 'Headphones',
    quantity: 2,
    unitPrice: 100,
    totalPrice: 200,
    status: 'Pending'
  }
])

  const [productName, setProductName] =
    useState('')

  const [category, setCategory] =
    useState('')

  const [price, setPrice] =
    useState(0)

  const [stock, setStock] =
    useState(0)

  const [editProductId, setEditProductId] =
    useState(null)

  const matchesSearch = (product) => {
    return product.name
      .toLowerCase()
      .includes(searchProduct.toLowerCase())
  }

  const matchesCategory = (product) => {
    return (
      selectedCategory === 'All' ||
      product.category === selectedCategory
    )
  }

  const filteredProducts = products.filter((product) => {
    return (
      matchesSearch(product) &&
      matchesCategory(product)
    )
  })

  const productToEdit = products.find(
    (product) => product.id === editProductId
  )

  useEffect(() => {
    if (!productToEdit) {
      return
    }

    setProductName(productToEdit.name)
    setCategory(productToEdit.category)
    setPrice(productToEdit.price)
    setStock(productToEdit.stock)
  }, [editProductId])

  function Sidebar({ storeName, storeEmail, storePhone }) {
    return (
      <aside className="sidebar">
        <h1>{storeName}</h1>
        <p>{storeEmail}</p>
        <p>{storePhone}</p>

        <nav>
  <a onClick={() => setActiveSection('Dashboard')}>
    Home
  </a>

  <a onClick={() => setActiveSection('Products')}>
    Products
  </a>

  <a onClick={() => setActiveSection('Orders')}>
    Orders
  </a>

  <a onClick={() => setActiveSection('Settings')}>
    Settings
  </a>
</nav>
      </aside>
    )
  }

  function DashboardStats({ products, orders }) {
    const totalProducts = products.length
    const totalOrders = orders.length
    const pendingOrders = orders.filter(
       (order) => order.status === "Pending"
    ).length
    const completedOrders = orders.filter(
        (order) => order.status === "Completed"
    ).length

    const inStock = products.filter(
      (product) => product.stock > 5
    ).length


    const lowStock = products.filter(
      (product) =>
        product.stock >= 1 &&
        product.stock <= 5
    ).length

    const stats = [
      {
        title: 'Total Products',
        value: totalProducts
      },
      {
        title: 'In Stock',
        value: inStock
      },
      {
        title: 'Low Stock',
        value: lowStock
      },
      {
        title: 'Total Orders',
        value: totalOrders 
      },
      {
        title: 'Pending Orders',
        value: pendingOrders 
      },
      {
        title: 'Completed Orders',
        value: completedOrders 
      }
      
    ]

    return (
  <>
    <div className="stats-grid">
      {stats.map((stat) => {
        return (
          <div key={stat.title}>
            <h2>{stat.title}</h2>
            <p>{stat.value}</p>
          </div>
        )
      })}
    </div>
    <div className='dashboard-sections'>
    <div className="recent-orders">
        {orders.map((order) => {
          return(
            <div
            className="recent-order"
            key={order.id}>
              <p>{order.customerName}</p>
              <p>{order.product}</p>
              <p>{order.totalPrice}</p>
              <p className={`status ${order.status.toLowerCase()}`}> {order.status}</p>
            </div>
          )
        })}
    </div>
    <div className="low-stock-products">
      <h2>Low Stock Products</h2>

      {products
        .filter(
          (product) =>
            product.stock >= 1 &&
            product.stock <= 5
        )
        .map((product) => {
          return (
            <div
            className="low-stock-product"
            key={product.id}>
              <p>{product.name}</p>
              <p>Stock: {product.stock}</p>
            </div>
          )
      })}
    </div>
    </div>
  </>
      )
  }

  return (
    <div className="app">

      <Sidebar 
      storeName={storeName}
      storeEmail={storeEmail}
      storePhone={storePhone}
      currency={currency}
      />

      <main className="main-content">

        {activeSection === 'Dashboard' && (
          <>
            <div className="page-header">
              <h1>Dashboard</h1>
              <p>
                Manage your store and products
              </p>
              <p className="welcome-message" >Welcome, CJ 👋</p>
            </div>

            <DashboardStats 
            products={products}
            orders={orders}/>
          </>
        )}

        {activeSection === 'Products' && (
          <>
            <div className="page-header">
              <h1>Products</h1>
              <p>
                Manage your store products
              </p>
            </div>

            <ProductFilters
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              selectedCategory={selectedCategory}
              setSelectedCategory={
                setSelectedCategory
              }
            />

            <ProductList
              products={filteredProducts}
              setProducts={setProducts}
              setEditProductId={setEditProductId}
              currency={currency}
            />

            <AddProductForm
              setProducts={setProducts}
              productName={productName}
              setProductName={setProductName}
              category={category}
              setCategory={setCategory}
              price={price}
              setPrice={setPrice}
              stock={stock}
              setStock={setStock}
              editProductId={editProductId}
              setEditProductId={setEditProductId}
              
            />
          </>
        )}

        {activeSection === 'Orders' && (
          <>
            <div className="page-header">
              <h1>Orders</h1>
              <p>
                Manage customer orders
              </p>
            </div>

            <Orders 
            orders={orders}
            setOrders={setOrders}
            defaultOrderStatus={defaultOrderStatus}
            products={products}
            setProducts={setProducts}
            currency={currency} />
          </>
        )}

        {activeSection === 'Settings' && (
  <>
    <div className="page-header">
      <h1>Settings</h1>
      <p>Manage your ShopFlow settings</p>
    </div>

    <Settings 
    storeName={storeName}
    setStoreName={setStoreName}
    storeEmail={storeEmail}
    setStoreEmail={setStoreEmail}
    storePhone={storePhone}
    setStorePhone={setStorePhone}
    currency={currency}
    setCurrency={setCurrency}
    defaultOrderStatus={defaultOrderStatus}
    setDefaultOrderStatus={setDefaultOrderStatus}
     />
  </>
          )}

      </main>
    </div>
  )
}

export default App

