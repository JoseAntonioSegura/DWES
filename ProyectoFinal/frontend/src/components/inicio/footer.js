import { Link } from 'react-router-dom';
import './footer.css';
import terminosycondiciones from '../../files/Terminos y Servicios.pdf';
import privacidad from '../../files/privacidad.pdf';
import cookies from '../../files/cookies.pdf';
import instagram from '../../resources/instagram.png';
import facebook from '../../resources/facebook.png';
import linkedln from '../../resources/linkedln.png';
import youtube from '../../resources/youtube.png';
import calle from '../../resources/camino.png';
import email from '../../resources/email.png';
import country from '../../resources/country.png';
import telefono from '../../resources/telefono.png';
import ubicacion from '../../resources/ubicacion.png';

function Footer() {

  return (
    <>
    <footer>
      <div className='containerFooterTop'>
        <div className='footerColumn'>
          <div><a className='titleFooter'>Información</a></div>
          <ul>
            <li><a href={terminosycondiciones} target="_blank">Términos y Servicios</a></li>
            <li><a href={privacidad} target="_blank">Política de privacidad</a></li>
            <li><a href={cookies} target="_blank">Política de Cookies</a></li>
          </ul>
        </div>
         <div className='footerColumn'>
          <div><a className='titleFooter'>Contacto</a></div>
          <ul>
            <li><a target="_blank"><img className='imgFooter' src={telefono}/>622 66 66 66</a></li>
            <li><a target="_blank"><img className='imgFooter' src={email}/>asistencia@ninjagames.com</a></li>
          </ul>
        </div>
        <div className='footerColumn'>
          <div><a className='titleFooter'>Ubicación</a></div>
          <ul>
            <li><a target="_blank"><img className='imgFooter' src={ubicacion}/>Spain, Sevilla</a></li>
            <li><a target="_blank"><img className='imgFooter' src={calle}/>C. Rioja, 13, 1ºC, Casco Antiguo, 41001</a></li>
          </ul>
        </div>
      </div>
      <div className='containerFooterBottom'>
        <div>
          <a>Copyright © 2024 All Rights Reserved by Ninja Games</a>
        </div>
        <div>
          <img className='social' src={instagram} />
          <img className='social' src={facebook} />
          <img className='social' src={youtube} />
          <img className='social' src={linkedln} />
        </div>
      </div>
    </footer>
  </>
);
}

export default Footer;
