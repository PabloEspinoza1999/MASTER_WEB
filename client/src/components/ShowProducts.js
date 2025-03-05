import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const endpoint = "http://127.0.0.1:8000/api/products/"; // Endpoint para productos

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  // Función para obtener todos los productos
  const getAllProducts = async () => {
    try {
      const response = await axios.get(endpoint);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error al obtener los productos", error);
    }
  };

  // Función para eliminar un producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${endpoint}${id}`);
      getAllProducts();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Product Management</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-secondary">Product List</h4>
        <Link to="/create" className="btn btn-success shadow-sm">
          <i className="fas fa-plus"></i> Create Product
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped shadow-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td className="text-center">
                    <Link to={`/edit/${product.id}`} className="btn btn-warning btn-sm mx-1 rounded shadow">
                      <i className="fas fa-edit"></i> Edit
                    </Link>
                    <button className="btn btn-danger btn-sm rounded shadow" onClick={() => deleteProduct(product.id)}>
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowProducts;
