import React from 'react';
import './footer.css';

const Footer = () => {
  const toggleList = () => {};

  return (
    <nav className="footer">
      <div className="footer__container row">
        <div className="footer__section">
          <h4 className="inline">Porque comprar</h4>
          <button className="btn inline display__list" onClick={toggleList}>
            <i className="fas fa-plus"></i>
          </button>
          <ul className="footer_ul">
            <li>Como comprar</li>
            <li>Formas de pago</li>
            <li>Gastos de envio</li>
            <li>Cupones de descuento</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4 className="inline">Quienes somos</h4>
          <button className="btn inline display__list">
            <i className="fas fa-plus"></i>
          </button>
          <ul className="footer_ul">
            <li>Quienes somos</li>
            <li>Nuestras tiendas</li>
            <li>Condiciones de compra</li>
            <li>Marcas</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4 className="inline">Contáctanos</h4>{' '}
          <button className="btn inline display__list">
            <i className="fas fa-plus"></i>
          </button>
          <ul className="footer_ul">
            <li>Centro de soporte</li>
            <li>Contacto</li>
            <li>Devoluciones</li>
            <li>Garantias</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4 className="inline">Nuestras RRSS</h4>
          <button className="btn inline display__list">
            <i className="fas fa-plus"></i>
          </button>
          <ul className="footer_ul">
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
