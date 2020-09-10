import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <nav className="footer row">
        <div className="">
          <h3>Porque comprar</h3>
          <p>Como comprar</p>
          <p>Formas de pago</p>
          <p>Gastos de envio</p>
          <p>Cupones de descuento</p>
        </div>
        <div className="">
          <h3>Quienes somos</h3>
          <p>Quienes somos</p>
          <p>Nuestras tiendas</p>
          <p>Condiciones de compra</p>
          <p>Marcas</p>
        </div>
        <div className="">
          <h3>Contactar</h3>
          <p>Centro de soporte</p>
          <p>Contacto</p>
          <p>Devoluciones</p>
          <p>Garantias</p>
        </div>
        <div className="">
          <h3>RRSS</h3>
          <p>
            <i class="fab fa-instagram"> </i>Instagram
          </p>
          <p>
            <i class="fab fa-twitter"> </i>Twitter
          </p>
          <p>
            <i class="fab fa-youtube"> </i>Youtube
          </p>
          <p>
            <i class="fab fa-facebook"> </i>Facebook
          </p>
        </div>
      </nav>
    );
  }
}

export default Footer;
