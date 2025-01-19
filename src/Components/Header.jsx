import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <>
      <Navbar className="bg-primary d-flex align-items-center" fixed='top'>
        <Container>
          <Link to={'/'} style={{ textDecoration: "none" }}>
            <Navbar.Brand href="#home">
              <span className='fs-3 text-light'><FontAwesomeIcon icon={faUser} className='me-3' />User Info</span>
            </Navbar.Brand>

          </Link>
          <Link to={'/'}><button className='btn btn-warning rounded-0 ms-auto'><FontAwesomeIcon icon={faPowerOff} /> Logout</button></Link>
        </Container>
      </Navbar>
    </>
  )
}

export default Header