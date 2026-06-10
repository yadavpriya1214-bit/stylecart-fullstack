import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const images = [
    "https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg",
    "https://img.freepik.com/premium-vector/summer-fashion-sale-banner-design-template_2239-1174.jpg?w=2000",
    "https://i.pinimg.com/originals/6c/52/58/6c52584568600f7c77f91f49be6ea1b4.jpg",
    "https://templates.simplified.co/thumb/3446e660-7af3-4ff6-86ce-755afcde8fcd.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
  }, []);

  
  function handlePlaceOrder() {
    alert("Order Placed Successfully! 🎉");
  }

  function handleAddToCart(product) {
    alert(`${product.name} added to cart 🛒`);
  }

  return (
    <div className="home">

     
      <div className="slider">
        <img src={images[current]} alt="banner" />
      </div>

     
      <h2 className="section-title">TOP OFFERS !!!</h2>

     
      <div className="grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.slice(0, 8).map((item) => (
            <div key={item._id} className="card offer-card">

             
              <Link to={`/product/${item._id}`}>
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:5001/images/${item.image}`
                  }
                  alt={item.name}
                  className="image"
                />
              </Link>

             
              <h3>
                <Link
                  to={`/product/${item._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {item.name}
                </Link>
              </h3>

              <p>₹{item.price}</p>

              
              <button
                className="button"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>

              <button
                className="order-btn"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No products available</p>
        )}
      </div>

    </div>
  );
}

export default Home;