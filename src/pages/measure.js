import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';

import Layout from 'components/Layout';
import { convert } from 'utils/units';

const convertRegex = /([\d.-]+)\s+(\w+)/i;

export default function Measure() {
  const [scaleFactor, setScaleFactor] = useState(1);
  const { touched, values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      actualSize: '',
      desiredSize: ''
    },
    validateOnChange: false,
    validate: (values) => {
      const result = {};

      const { actualSize, desiredSize } = values;
      const lengthUnits = convert().possibilities();
      const actualMatches = actualSize.match(convertRegex);
      const desiredMatches = desiredSize.match(convertRegex);

      if (!actualMatches) {
        result.actualSize = 'Missing value or unit';
      } else {
        const [, actualVal, actualUnit] = actualMatches;

        if (isNaN(parseFloat(actualVal))) {
          result.actualSize = 'Value must be a number';
        } else if (!lengthUnits.includes(actualUnit.toLocaleLowerCase())) {
          result.actualSize = `Unrecognized unit ${actualUnit}`;
        }
      }

      if (!desiredMatches) {
        result.desiredSize = 'Missing value or unit';
      } else {
        const [, desiredVal, desiredUnit] = desiredMatches;

        if (isNaN(parseFloat(desiredVal))) {
          result.desiredSize = 'Value must be a number';
        } else if (!lengthUnits.includes(desiredUnit.toLocaleLowerCase())) {
          result.desiredSize = `Unrecognized unit ${desiredUnit}`;
        }
      }

      return result;
    },
    onSubmit: (values) => {
      const { actualSize, desiredSize } = values;
      const [, actualVal, actualUnit] = actualSize.match(convertRegex);
      const [, desiredVal, desiredUnit] = desiredSize.match(convertRegex);

      const actualValInDesiredUnit = convert(parseFloat(actualVal))
        .from(actualUnit)
        .to(desiredUnit);

      setScaleFactor(actualValInDesiredUnit / desiredVal);
    }
  });

  return (
    <Layout title="Measure">
      <h1 className="mt-2">Measure</h1>
      <span>
        Input the actual and desired size, and the scale factor will be
        calculated for you.
      </span>
      <Card body className="my-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column htmlFor="actualSize" sm={2}>
              Actual Size
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                isInvalid={Boolean(errors.actualSize)}
                isValid={touched.actualSize && !errors.actualSize}
                name="actualSize"
                onChange={handleChange}
                type="text"
                value={values.actualSize}
              />
              {Boolean(errors.actualSize) && (
                <Form.Control.Feedback type="invalid">
                  {errors.actualSize}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column htmlFor="desiredSize" sm={2}>
              Desired Size
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                isInvalid={Boolean(errors.desiredSize)}
                isValid={touched.desiredSize && !errors.desiredSize}
                name="desiredSize"
                onChange={handleChange}
                type="text"
                value={values.desiredSize}
              />
              {Boolean(errors.desiredSize) && (
                <Form.Control.Feedback type="invalid">
                  {errors.desiredSize}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 d-flex justify-content-end">
            <Button type="submit" variant="success">
              Calculate
            </Button>
          </Form.Group>
        </Form>
      </Card>
      <Card body className="my-2">
        <Card.Title>Scale Factor</Card.Title>
        <InputGroup style={{ width: 125 }}>
          <InputGroup.Text>1 :</InputGroup.Text>
          <Form.Control
            disabled
            style={{ textAlign: 'right' }}
            type="text"
            value={scaleFactor}
          />
        </InputGroup>
      </Card>
    </Layout>
  );
}
