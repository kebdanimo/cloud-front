import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    discription: "",
    price: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const submit = () => {
    axios
      .post("http://localhost:3000/add-product", product)
      .then((response) => {
        setProducts([...products, response.data.product]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  return (
    <div className="App">
      {active && (
        <div className="model">
          <div className="up">
            <h1> Add product </h1>
            <h1 style={{ cursor: "pointer" }} onClick={(e) => setActive(false)}>
              X
            </h1>
          </div>

          <form>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />

            <label htmlFor="discription">Discription</label>
            <textarea
              id="discription"
              name="discription"
              value={product.discription}
              onChange={(e) =>
                setProduct({ ...product, discription: e.target.value })
              }
            ></textarea>

            <button
              type="submit"
              style={{
                background: "black",
                color: "white",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={e=>submit()}
            >
              Add product
            </button>
          </form>
        </div>
      )}

      <header>
        <h1>Products</h1>
        <p style={{ cursor: "pointer" }} onClick={(e) => setActive(true)}>
          + Add product
        </p>
      </header>

      <ul>
        {products.length > 0 &&
          products.map((product) => {
            return (
              <li key={product.id}>
                <div className="product">
                  <div className="up">
                    <h3> {product.name} </h3>
                    <p> {product.price}$ </p>
                  </div>
                  <p> {product.discription} </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
