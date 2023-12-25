import "./App.css";
import products from "./data/products";
import { useState } from "react";

function App() {
  const [totalProduct, setTotalProduct] = useState(products);
  const [addProductCart, setAddProductCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const productInCart = (index) => {
    const productId = totalProduct[index].id;
    const productIndex = addProductCart.findIndex(
      (item) => item.id === productId
    );
    const updatedCart = [...addProductCart];
      if (productIndex !== -1) {
        updatedCart[productIndex].quantity += 1;
      } else {
        const newProduct = { ...totalProduct[index], quantity: 1 };
        updatedCart.push(newProduct);
      }
    setAddProductCart(updatedCart);
    totalPriceProduct(updatedCart);
  };

  const deleteProductInCart = (index) => {
    const newProductInCart = [...addProductCart];
    newProductInCart.splice(index, 1);
    setAddProductCart(newProductInCart);
    totalPriceProduct(newProductInCart);
  };

  const addProduct = (index) => {
    const updatedCart = [...addProductCart];
    updatedCart[index].quantity += 1;
    setAddProductCart(updatedCart);
    totalPriceProduct(updatedCart);
  };

  const reduceProduct = (index) => {
    const updatedCart = [...addProductCart];
    if (updatedCart[index].quantity > 0) {
      updatedCart[index].quantity -= 1;
    }else{
      updatedCart.splice(index, 1);
    }
    setAddProductCart(updatedCart);
    totalPriceProduct(updatedCart);
  };

  const totalPriceProduct = (totalPrice) => {
    let priceProduct;
    priceProduct = totalPrice.reduce((accumulator, currentValue) => {
      return accumulator += currentValue.price * currentValue.quantity;
    }, 0);
    setTotalPrice(priceProduct);
  };

  return (
    <div className="App">
      <h1 className="product-heading">Products</h1>
      <section className="product-container">
        <div className="product-list">
          {totalProduct.map((productList, index) => {
            return (
              <div key={index} className="product">
                <img src={productList.image} alt="sample name" />
                <h2>{productList.name}</h2>
                <p>{productList.description}</p>
                <button
                  onClick={() => {
                    productInCart(index);
                  }}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />
      <h1 className="cart-heading">Cart (Total Price is {totalPrice} Baht)</h1>
      <section className="cart">
        <div className="cart-item-list">
          {addProductCart.map((productList, index) => {
            return (
              <div key={index} className="cart-item">
                <h1>Item name: {productList.name}</h1>
                <h2>Price: {productList.price} Baht</h2>
                <h2>Quantity: {productList.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteProductInCart(index);
                  }}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => {
                      addProduct(index);
                    }} 
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => {
                      reduceProduct(index);
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
