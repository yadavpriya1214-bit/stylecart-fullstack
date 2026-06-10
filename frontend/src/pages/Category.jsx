import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/Category.css";

function Category({ setCart }) {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [subCategory, setSubCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => {
        const mainFiltered = data.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase().trim() ===
              category?.toLowerCase().trim()
        );

        setProducts(mainFiltered);
        setFilteredProducts(mainFiltered);
      });
  }, [category]);

  function handleSubCategory(sub) {
    setSubCategory(sub);

    if (sub === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) =>
          item.subcategory &&
          item.subcategory.toLowerCase().trim() ===
            sub.toLowerCase().trim()
      );
      setFilteredProducts(filtered);
    }
  }

  function handleAddToCart(product) {
    const user = JSON.parse(localStorage.getItem("user"));

   
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });

    
    fetch("http://localhost:5001/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: user._id,
  product: product._id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: 1
      })
    });

    alert("Added to cart 🛒");
  }

 
  function handlePlaceOrder(product) {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:5001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: user._id,
        cartItems: [{ ...product, qty: 1 }]
      })
    })
      .then((res) => res.json())
      .then(() => alert("Order Placed Successfully 🎉"));
  }

  const subOptions = {
    Women: ["All", "Saree", "Dress", "Chudidar", "Lehenga", "Jewellery"],
    Men: ["All", "Shirt", "T-Shirt", "Pants"],
    Books: ["All", "Story", "Education"],
    Kids: ["All", "Boys", "Girls", "Toys"]
  };

  return (
    <div className="container">
      <h1 className="heading">{category} Products</h1>

      <div className="category-buttons">
        {(subOptions[category] || ["All"]).map((sub) => (
          <button
            key={sub}
            className={`cat-btn ${
              subCategory === sub ? "active" : ""
            }`}
            onClick={() => handleSubCategory(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredProducts.map((item) => (
          <div key={item._id} className="card">

            <Link to={`/product/${item._id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="image"
              />
            </Link>

            <h3>
              <Link to={`/product/${item._id}`}>
                {item.name}
              </Link>
            </h3>

            <p>₹{item.price}</p>

            <button onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>

            <button onClick={() => handlePlaceOrder(item)}>
              Place Order
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;