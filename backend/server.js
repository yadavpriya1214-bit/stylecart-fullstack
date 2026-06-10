const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes"); 
const orderRoutes = require("./routes/orderRoutes");

const app = express();
 
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.use("/images", express.static("images"));

connectDB();

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
  