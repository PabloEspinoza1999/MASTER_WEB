import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProducts = () => {
  const { id } = useParams();  // Obtener el ID del producto desde la URL
  const navigate = useNavigate();  // Reemplazar useHistory con useNavigate
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  // Obtener los datos del producto cuando se monta el componente
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
      const data = await response.json();
      if (data.product) {
        setProduct(data.product);  // Establecer los datos del producto en el estado
      } else {
        console.error('Producto no encontrado');
      }
    };
    getProduct();
  }, [id]);

  // Manejo de los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Enviar los datos para actualizar el producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct(id, product);
      if (response.message === 'Product updated successfully') {
        navigate('/');  // Redirigir a la página principal si la actualización es exitosa
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  // Función para actualizar el producto en la API de Laravel
  const updateProduct = async (id, productData) => {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar el producto');
    }
    return data;  // Devuelve los datos de la respuesta
  };

  return (
    <div className="edit-product">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default EditProducts;
