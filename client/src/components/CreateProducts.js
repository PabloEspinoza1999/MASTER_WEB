import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const navigate = useNavigate(); // Reemplaza useHistory con useNavigate

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para crear el producto
  const createProduct = async (productData) => {
    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Producto creado', data);
    } else {
      throw new Error('Error al crear el producto');
    }
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product); 
      navigate('/'); // Navegar a la página principal después de crear el producto
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default CreateProduct;
