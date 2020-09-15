import React, { Component } from 'react';
import './footer.css';

const Footer = () => {
  return (
    <nav className="footer">
      <div className="footer__container row">
        <div className="footer__section">
          <h4>Porque comprar</h4>
          <ul>
            <li>Como comprar</li>
            <li>Formas de pago</li>
            <li>Gastos de envio</li>
            <li>Cupones de descuento</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Quienes somos</h4>
          <ul>
            <li>Quienes somos</li>
            <li>Nuestras tiendas</li>
            <li>Condiciones de compra</li>
            <li>Marcas</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Contactar</h4>
          <ul>
            <li>Centro de soporte</li>
            <li>Contacto</li>
            <li>Devoluciones</li>
            <li>Garantias</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>RRSS</h4>
          <ul>
            <li>
              <i className="fab fa-instagram"> </i>Instagram
            </li>
            <li>
              <i className="fab fa-twitter"> </i>Twitter
            </li>
            <li>
              <i className="fab fa-youtube"> </i>Youtube
            </li>
            <li>
              <i className="fab fa-facebook"> </i>Facebook
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
