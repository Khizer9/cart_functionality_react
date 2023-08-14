import React, { useEffect, useState } from "react";
import Header from "./components/header";
import InputForms from "./components/inputForms";
import ProductList from "./components/ProductList";
import Btns from "./components/Btns";

const defaultValues = {
  name: "",
  price: 0,
  desc: "",
};

const App = () => {
  const [productValues, setProductValues] = useState(defaultValues);

  // done
  const gettingProductsFromLocalStorage = () => {
    let data = localStorage.getItem("products");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [products, setProducts] = useState(gettingProductsFromLocalStorage);
  const [carts, setCarts] = useState([]);
  const [confirm, setConfirm] = useState([]);

  const [showProducts, setShowProducts] = useState(true);
  const [showCarts, setShowCarts] = useState(true);

  // done
  const inputHandlers = (e) => {
    setProductValues({
      ...productValues,
      [e.target.name]: e.target.value,
    });
  };

  // running
  const addProduct = () => {
    // check input empty
    // else -> [...products, {newName, newPRice, newDesc} ]

    if (
      productValues.name === "" ||
      productValues.desc === "" ||
      productValues.price === 0
    ) {
      // alert all values are required
      alert("All values are required to add a product");
    } else {
      const newProduct = {
        name: productValues.name,
        desc: productValues.desc,
        price: productValues.price,
        id: new Date(),
      };

      setProducts([...products, newProduct]);
      setProductValues(defaultValues);
    }
  };

  // done
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  // done
  const removeProduct = (id) => {
    setProducts(products.filter((x) => x.id !== id));
  };
  // done
  const addToCart = (x) => {
    removeProduct(x.id);
    setCarts([...carts, x]);
    console.log(carts, "carts")
  };

  // ShowProduct -> true ---- Products
  // ShowProduct -> false ----- carts
  const switchToCart = () => {
    setShowProducts(!showProducts);
  };

  // let amount = 0;
  // const totalAmount = () => {
  //   for (let i = 0; i < carts.length; i++) {
  //     amount = amount + parseInt(carts[i].price);
  //   }
  //   return amount;
  // };

  let confirmHandler = () => {
    setConfirm(carts)
    setCarts([])
  }

  const confirmOrder = () => {
    setShowCarts(!showCarts)
    console.log(confirm, "ello")
  }

  const totalAmount = carts.reduce((x, y) => x + parseFloat(y.price), 0) ;


  return (
    <div className="container">
      <Header title={"Product To Cart"} />
      <InputForms
        productValues={productValues}
        inputHandlers={inputHandlers}
        addProduct={addProduct}
      />
      <Btns switchToCart={switchToCart} cartsCount={carts.length} confirmCount={confirm.length} confirmOrder={confirmOrder}/>
      {showProducts === true ? (
  <ProductList products={products} addToCart={addToCart} />
) : (
  <>
    <ul>
      <h5> Total Amount : {totalAmount} </h5>
      {showCarts === true ? (<button onClick={confirmHandler}> Confirm Order </button>) : ""}
      
      {/* {carts.map((x) => (
        <li
          key={x.id} 
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          {x.name} - {x.price} PKR
        </li>
      ))} */}
    </ul>
    {showCarts === true ? (
      <ul>
        {carts.map((x) => (
          <li
            key={x.id} 
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            {x.name} - {x.price} PKR
          </li>
        ))}
      </ul>
    ) : (
      <ul>
        {confirm.map((x) => (
          <li
            key={x.id} 
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            {x.name} - {x.price} PKR
          </li>
        ))}
      </ul>
    )}
  </>
)}

      
    </div>
    
  );
};

export default App;
