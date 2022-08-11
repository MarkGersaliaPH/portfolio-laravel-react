import { Link } from '@inertiajs/inertia-react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarComponent(props) {
  let { user } = props.auth;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top">
      <Container>
        <Navbar.Brand href="#home">{user.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           <Link href={route('admin.dashboard')} className="nav-link active">Dashboard</Link>
            <Link href={route('admin.messages')} className="nav-link">Messages{' '}
            <span className="badge bg-danger" style={{top:'-10px'}}>4</span>
            </Link>
           <Link href={route('admin.companies.index')} className="nav-link" >Companies</Link>
            <Link href={route('admin.projects.index')} className="nav-link">Projects</Link>
            
           <Link href={route('admin.bio-settings.index')} className="nav-link">Bio Settings</Link>
          </Nav>
          <Nav>
            <Link href={route('logout')}   className="nav-link">Sign out</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;