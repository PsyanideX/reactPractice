import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <nav className="footer">
      <div className="footer__container row">
        <div className="footer__section">
          <h4 className="inline">Porque comprar</h4>
          <div className="btn-group dropup">
            <button className="btn inline display__list dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <ul className="dropdown-menu footer__dropdown">
              <li className="dropdown-item">Como comprar</li>
              <li className="dropdown-item">Formas de pago</li>
              <li className="dropdown-item">Gastos de envio</li>
              <li className="dropdown-item">Cupones de descuento</li>
            </ul>
          </div>
          <ul className="footer_ul">
            <li>Como comprar</li>
            <li>Formas de pago</li>
            <li>Gastos de envio</li>
            <li>Cupones de descuento</li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="inline">Quienes somos</h4>
          <div className="btn-group dropup">
            <button className="btn inline display__list dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <ul className="dropdown-menu footer__dropdown">
              <li className="dropdown-item">Quienes somos</li>
              <li className="dropdown-item">Nuestras tiendas</li>
              <li className="dropdown-item">Condiciones de compra</li>
              <li className="dropdown-item">Marcas</li>
            </ul>
          </div>
          <ul className="footer_ul">
            <li>Quienes somos</li>
            <li>Nuestras tiendas</li>
            <li>Condiciones de compra</li>
            <li>Marcas</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4 className="inline">Contáctanos</h4>{' '}
          <div className="btn-group dropup">
            <button className="btn inline display__list dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <ul className="dropdown-menu footer__dropdown">
              <li className="dropdown-item">Centro de soporte</li>
              <li className="dropdown-item">Contacto</li>
              <li className="dropdown-item">Devoluciones</li>
              <li className="dropdown-item">Garantias</li>
            </ul>
          </div>
          <ul className="footer_ul">
            <li>Centro de soporte</li>
            <li>Contacto</li>
            <li>Devoluciones</li>
            <li>Garantias</li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="inline">Nuestras RRSS</h4>
          <div className="btn-group dropup">
            <button className="btn inline display__list dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <ul className="dropdown-menu footer__dropdown">
              <li className="dropdown-item">
                <i className="fab fa-instagram"> </i>Instagram
              </li>
              <li className="dropdown-item">
                <i className="fab fa-twitter"> </i>Twitter
              </li>
              <li className="dropdown-item">
                <i className="fab fa-youtube"> </i>Youtube
              </li>
              <li className="dropdown-item">
                <i className="fab fa-facebook"> </i>Facebook
              </li>
            </ul>
          </div>

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

export default React.memo(Footer);
