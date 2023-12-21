import "./App.css";
import products from "./data/products.js";
import { useState } from "react";
function App() {
  const addKeyInProduct = products.map((items) => {
    return { ...items, qty: 0, eachTotal: 0 };
  });
  const [allProducts, setAllProducts] = useState(addKeyInProduct);
  const [inCart, setInCart] = useState([]);

  function handleAddtocart(product, index) {
    if (product.qty == 0) {
      product.qty += 1;
      product.eachTotal = product.qty * product.price;
      const updateInCart = [...inCart, product];
      setInCart(updateInCart);
    } else {
      product.qty += 1;
      product.eachTotal = product.qty * product.price;
      const updateInCart = [...inCart];
      setInCart(updateInCart);
    }
    console.log(product);
    console.log(inCart);
  }
  function handleClose(item, index) {
    item.qty = 0;
    item.eachTotal = item.qty * item.price;
    const updateCart = [...inCart];
    updateCart.splice(index, 1);
    setInCart(updateCart);
  }
  function calTotalPrice() {
    return inCart.reduce((acc, curr) => {
      return acc + curr.eachTotal;
    }, 0);
  }

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {allProducts.map((product) => {
            return (
              <div className="product-list">
                <div className="product">
                  <img src={product.image} alt="sample name" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <button
                    onClick={() => {
                      handleAddtocart(product);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {calTotalPrice()} Baht)
        </h1>
        <div className="cart-item-list">
          {inCart.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <h1>Item name: {item.name}</h1>
                <h2>Price: {item.price} Baht</h2>
                <h2>Quantity:{item.qty}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    handleClose(item, index);
                  }}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => {
                      item.qty += 1;
                      item.eachTotal = item.qty * item.price;
                      const updateInCart = [...inCart];
                      setInCart(updateInCart);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => {
                      item.qty -= 1;
                      item.eachTotal = item.qty * item.price;
                      const updateInCart = [...inCart];
                      setInCart(updateInCart);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
