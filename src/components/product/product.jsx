import React, { useState, useEffect } from 'react';
import { apiUrl, getRequest } from '../../shared/constants/constants';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import './product.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../../core/store/reducers/cartSlice';

const Product = props => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [avatars] = useState([
    'https://www.w3schools.com/howto/img_avatar2.png',
    'https://www.w3schools.com/howto/img_avatar.png',
    'https://www.w3schools.com/w3images/avatar2.png',
  ]);

  const addItemToCart = () => {
    let item = {
      id: product.id,
      productname: product.productname,
      productdescription: product.productdescription,
      price: product.dealprice ? product.dealprice : product.price,
      quantity: quantity,
    };
    dispatch(addItem(item));
  };

  const addOneUnity = () => {
    setQuantity(quantity + 1);
  };

  const substractOneUnity = () => {
    let newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
  };

  const priceWithoutIVA = price => {
    return (price / 1.21).toFixed(2);
  };

  useEffect(() => {
    let productId = props.match.params.productId;
    const urlProduct = `${apiUrl}/products/${productId}`;
    const urlDeal = `${apiUrl}/deals/${productId}`;
    fetch(urlDeal, getRequest)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          fetch(urlProduct, getRequest)
            .then(response => {
              return response.json();
            })
            .then(response => setProduct(response));
        }
      })
      .then(response => setProduct(response));
  }, [props.match.params.productId]);

  console.log('RENDER PRODUCT DETAIL');
  return (
    <div className="flex-wrapper">
      <Navbar />
      <div className="container product__container">
        {product ? (
          product.id >= 0 ? (
            <div className="row">
              <div id="productImageCarousel" className="carousel slide col">
                <div className="carousel-inner">
                  <div className="carousel-item active" key="avatar">
                    <img src={product.image} alt={product.productname} className="product__image d-block w-100" />
                  </div>
                  {avatars.map((avatar, i) => (
                    <div className="carousel-item" key={`avatar${i}`}>
                      <img src={avatar} alt={product.productname} className="product__image d-block w-100" />
                    </div>
                  ))}
                  <a className="carousel-control-prev" href="#productImageCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon slide-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#productImageCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon slide-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className="product-details col">
                <h2>{product.productname}</h2>
                <p>{product.productdescription}</p>
                {product.dealprice ? (
                  <div>
                    <h4 className="inline product__deal-price">{product.dealprice}€</h4>{' '}
                    <p className="inline">{`(${priceWithoutIVA(product.dealprice)}€ sin IVA)`}</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="inline">{product.price}€</h4> <p className="inline">{`(${priceWithoutIVA(product.price)}€ sin IVA)`}</p>
                  </div>
                )}
                <div className="buy-buttons">
                  <button className="btn btn-default" onClick={addItemToCart}>
                    ¡A la cesta!
                  </button>
                  <button className="btn btn-default">Comprar</button>
                </div>
                <p>Cantidad:</p>
                <div className="btn-group">
                  <button className="btn quantity-buttons" onClick={substractOneUnity}>
                    <i className="far fa-minus-square"></i>
                  </button>
                  <input type="text" value={quantity} className="form-control product__quantity" readOnly />
                  <button className="btn quantity-buttons" onClick={addOneUnity}>
                    <i className="far fa-plus-square"></i>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="spinner-border product__spinner" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default React.memo(Product);
