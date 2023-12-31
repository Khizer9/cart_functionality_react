import React, { useEffect, useState } from "react";
import Header from "./components/header";
import InputForms from "./components/inputForms";
import ProductList from "./components/ProductList";
import Btns from "./components/Btns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
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

  const gettingCartProductFromLS =() => {
    let data = localStorage.getItem("carts")
    if(data) {
      return JSON.parse(data);
    }else {
      return []
    }
  }

  const confirmOrderFromLC = () => {
    const data = localStorage.getItem("confirmOrder")
    if(data){
      return JSON.parse(data);
    }else {
      return [];
    }
  }

  const [products, setProducts] = useState(gettingProductsFromLocalStorage);
  const [carts, setCarts] = useState(gettingCartProductFromLS);
  const [confirm, setConfirm] = useState(confirmOrderFromLC);

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

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  useEffect(() => {
    localStorage.setItem("confirmOrder", JSON.stringify(confirm));
  }, [confirm]);

  // done
  const removeProduct = (id) => {
    setProducts(products.filter((x) => x.id !== id));
  };

  const removeCart = (id) => {
    let reCart = (carts.filter((x) => x.id !== id));
    setCarts(reCart);
  };

  const removeConfirm = (id) => {
    let reCart = (confirm.filter((x) => x.id !== id));
    setConfirm(reCart)
  };

  // done
  const addToCart = (x) => {
    removeProduct(x.id);
    setCarts([...carts, x]);
    console.log(carts, "carts")
  };


  const switchToCart = () => {
    setShowProducts(!showProducts);
  };


  let confirmHandler = () => {
    setConfirm(carts)
    setCarts([])
    
  }

  const confirmOrder = () => {
    setShowCarts(!showCarts)
  }

  const totalAmountFromCarts = carts.reduce((x, y) => x + parseFloat(y.price), 0) ;
  const totalAmountFromConfirm = confirm.reduce((x, y) => x + parseFloat(y.price), 0) ;


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
      <h5> Total Amount : {totalAmountFromCarts !== 0 ? totalAmountFromCarts : totalAmountFromConfirm} </h5>
      {showCarts === true ? (<button onClick={confirmHandler}> Confirm Order </button>) : ""}
      
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
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            {x.name} - {x.price} PKR
            <FontAwesomeIcon onClick={() => removeCart(x.id)} icon={faXmark} />
          </li>
        ))}
      </ul>
    ) : (
      <ul>
        {confirm.map((x) => (
          <>  
          <li          
            key={x.id} 
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            {x.name} - {x.price} PKR
            <FontAwesomeIcon onClick={() => removeConfirm(x.id)} icon={faXmark} />
          </li>
          </>
        ))}
      </ul>
    )}
  </>
)}

      
    </div>
    
  );
};

export default App;
