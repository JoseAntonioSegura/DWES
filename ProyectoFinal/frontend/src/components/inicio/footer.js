import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {

  return (
    <>
      <footer>
          <div className='containerFooterTop'>
            <div>
              <a>Logo</a>
            </div>
            <div>
              <a>Información</a>
            </div>
            <div>
              <a>Contacto</a>
            </div>
          </div>
          <div className='containerFooterBottom'>
            <div>
              <a>Copyright © 2024 All Rights Reserved by Ninja Games</a>
            </div>
            <div>
              
            </div>
          </div>
      </footer>
    </>
  );
}

export default Footer;
