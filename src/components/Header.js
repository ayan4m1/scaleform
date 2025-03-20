import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  faRightLeft,
  faRulerHorizontal
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>Scaleform</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faRightLeft} /> Convert
            </Nav.Link>
            <Nav.Link as={Link} to="/measure">
              <FontAwesomeIcon icon={faRulerHorizontal} /> Measure
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
