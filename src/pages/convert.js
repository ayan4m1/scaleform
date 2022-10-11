import { Fragment } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

import { useHistory } from 'hooks/useHistory';
import { useFormik } from 'formik';
import { uniqueId } from 'lodash-es';

export default function Convert() {
  const { entries, pushEntry } = useHistory();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      conversion: ''
    },
    onSubmit: (vals) => {
      pushEntry({
        id: uniqueId(),
        input: vals.conversion
      });
    }
  });

  return (
    <Fragment>
      <h1>Convert Units</h1>
      <Card>
        <Card.Body>
          <Card.Title>History</Card.Title>
          <Row>
            {entries.map((entry) => (
              <Col xs={12} key={entry.id}>
                <span>{entry.input}</span>
              </Col>
            ))}
          </Row>
        </Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Enter value</Form.Label>
            <Form.Control
              type="text"
              name="conversion"
              onChange={handleChange}
              value={values.conversion}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="success">
              Convert
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </Fragment>
  );
}
