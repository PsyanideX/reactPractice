import React, { useState, useEffect } from 'react';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './product.css';

const Product = props => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    id: 0,
    productname: '',
    productdescription: '',
    price: '',
    department: '',
    image: '',
  });
  const [avatars, setAvatars] = useState([
    'https://www.w3schools.com/howto/img_avatar2.png',
    'https://www.w3schools.com/howto/img_avatar.png',
    'https://www.w3schools.com/w3images/avatar2.png',
  ]);

  const addOneUnity = () => {
    setQuantity(quantity + 1);
  };

  const substractOneUnity = () => {
    let newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
  };

  useEffect(() => {
    let productId = props.match.params.productId;
    const url = `${apiUrl}/products/${productId}`;
    fetch(url, getRequest)
      .then(response => response.json())
      .then(response => setProduct(response));
  }, []);

  return (
    <div className="flex-wrapper">
      <Navbar />
      <div className="container product__container">
        <div className="row">
          <div id="productImageCarousel" className="carousel slide col">
            <div className="carousel-inner">
              <div className="carousel-item active" key="avatar">
                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt={product.productname} className="product__image d-block w-100" />
              </div>
              {avatars.map((avatar, i) => (
                <div className="carousel-item" key={`avatar${i}`}>
                  <img src={avatar} alt={product.productname} className="product__image d-block w-100" />
                </div>
              ))}
              <a className="carousel-control-prev" href="#productImageCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#productImageCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="product-details col">
            <h2>{product.productname}</h2>
            <p>Descripción del artículo:</p>
            <p>{product.productdescription}</p>
            <h4>{product.price}€</h4>
            <div className="buy-buttons">
              <button className="btn btn-default">Añadir a la cesta</button>
              <button className="btn btn-default">Comprar</button>
            </div>
            <p>Cantidad:</p>
            <div className="btn-group">
              <button className="btn quantity-buttons" onClick={substractOneUnity}>
                <i className="far fa-minus-square"></i>
              </button>
              <input type="text" value={quantity} className="form-control product__quantity" />
              <button className="btn quantity-buttons" onClick={addOneUnity}>
                <i className="far fa-plus-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
