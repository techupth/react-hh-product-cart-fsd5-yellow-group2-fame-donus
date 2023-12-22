import "./App.css";
import products from "./data/products.js";
import { useState } from "react";

function App() {
  const initialProducts = products.map((product) => {
    return { ...product, quantity: 0, total: 0 };
  });

  const allProducts = initialProducts;
  const [cartItems, setCartItems] = useState([]);

  function handleManageProductInCart(product, action) {
    if (action === "add") {
      if (
        cartItems.filter((cartItem) => cartItem.id === product.id).length === 0
      ) {
        const updatedQuantity = product.quantity + 1;
        const updatedTotal = updatedQuantity * product.price;
        const productToAdd = {
          ...product,
          quantity: updatedQuantity,
          total: updatedTotal,
        };
        const updatedCart = [...cartItems, productToAdd];
        setCartItems(updatedCart);
      } else {
        const existingCartItem = cartItems.find(
          (cartItem) => cartItem.id === product.id
        );
        const updatedQuantity = existingCartItem.quantity + 1;
        const updatedTotal = updatedQuantity * product.price;
        const updatedCart = cartItems.map((cartItem) =>
          cartItem.id === product.id
            ? {
                ...cartItem,
                quantity: updatedQuantity,
                total: updatedTotal,
              }
            : cartItem
        );
        setCartItems(updatedCart);
      }
    } else if (action === "subtract") {
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      const updatedQuantity = existingCartItem.quantity - 1;
      const updatedTotal = updatedQuantity * product.price;
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === product.id
          ? { ...cartItem, quantity: updatedQuantity, total: updatedTotal }
          : cartItem
      );
      setCartItems(updatedCart);
    }
  }

  function handleClose(item, index) {
    const updatedQuantity = 0;
    const updatedTotal = updatedQuantity * item.price;
    const updatedCartItem = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: updatedQuantity, total: updatedTotal }
        : cartItem
    );
    setCartItems(updatedCartItem);
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  }

  function calculateTotalPrice() {
    return cartItems.reduce((acc, curr) => acc + curr.total, 0);
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
          {allProducts.map((product, index) => (
            <div className="product-list" key={index}>
              <div className="product">
                <img src={product.image} alt="sample name" />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <button
                  onClick={() => {
                    handleManageProductInCart(product, "add");
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is {calculateTotalPrice()} Baht)
        </h1>
        <div className="cart-item-list">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <h1>Item name: {item.name}</h1>
              <h2>Price: {item.price} Baht</h2>
              <h2>Quantity:{item.quantity}</h2>
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
                    handleManageProductInCart(item, "add");
                  }}
                >
                  +
                </button>
                <button
                  className="subtract-quantity"
                  onClick={() => {
                    handleManageProductInCart(item, "subtract");
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
