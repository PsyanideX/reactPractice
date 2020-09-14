import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <nav className="footer">
        <div className="footer__container row">
          <div className="footer__section">
            <h3>Porque comprar</h3>
            <p>Como comprar</p>
            <p>Formas de pago</p>
            <p>Gastos de envio</p>
            <p>Cupones de descuento</p>
          </div>
          <div className="footer__section">
            <h3>Quienes somos</h3>
            <p>Quienes somos</p>
            <p>Nuestras tiendas</p>
            <p>Condiciones de compra</p>
            <p>Marcas</p>
          </div>
          <div className="footer__section">
            <h3>Contactar</h3>
            <p>Centro de soporte</p>
            <p>Contacto</p>
            <p>Devoluciones</p>
            <p>Garantias</p>
          </div>
          <div className="footer__section">
            <h3>RRSS</h3>
            <p>
              <i className="fab fa-instagram"> </i>Instagram
            </p>
            <p>
              <i className="fab fa-twitter"> </i>Twitter
            </p>
            <p>
              <i className="fab fa-youtube"> </i>Youtube
            </p>
            <p>
              <i className="fab fa-facebook"> </i>Facebook
            </p>
          </div>
        </div>
      </nav>
    );
  }
}

export default Footer;
