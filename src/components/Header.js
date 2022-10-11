import { faRightLeft, faRuler } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useScale } from 'hooks/useScale';
import { useDebounce } from 'hooks/useDebounce';

export default function Header() {
  const { denominator, setDenominator } = useScale();
  const onChangeDenominator = useDebounce((event) => {
    const value = parseFloat(event.target.value);

    if (!value || isNaN(value)) {
      return false;
    } else {
      setDenominator(value);
    }
  });

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Scaleform</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/convert">
              <FontAwesomeIcon icon={faRightLeft} /> Convert
            </Nav.Link>
            <Nav.Link as={Link} to="/measure">
              <FontAwesomeIcon icon={faRuler} /> Measure
            </Nav.Link>
          </Nav>
          <Nav>
            <Card bg="light">
              <Card.Body
                className="align-items-baseline"
                style={{ display: 'flex' }}
              >
                <h5 className="me-2">Set Scale</h5>
                <Form>
                  <InputGroup>
                    <InputGroup.Text>1 :</InputGroup.Text>
                    <Form.Control
                      type="number"
                      htmlSize="2"
                      onChange={onChangeDenominator}
                      defaultValue={denominator}
                      style={{ textAlign: 'right' }}
                    />
                  </InputGroup>
                </Form>
              </Card.Body>
            </Card>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
