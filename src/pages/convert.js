import convert from 'convert-units';
import { useFormik } from 'formik';
import { uniqueId } from 'lodash-es';
import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

import { useDebounce } from 'hooks/useDebounce';
import { useHistory } from 'hooks/useHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Layout from 'components/Layout';

const convertRegex = /([\d.-]+)\s+(\w+)\s+in\s+(\w+)/;

export default function Convert() {
  const { entries, denominator, pushEntry, clearEntries, updateDenominator } =
    useHistory();
  const { errors, values, handleSubmit, handleChange, setFieldError } =
    useFormik({
      initialValues: {
        conversion: ''
      },
      onSubmit: (vals) => {
        if (convertRegex.test(vals.conversion)) {
          const [, rawValue, unit, targetUnit] =
            vals.conversion.match(convertRegex);

          if (!rawValue || !unit || !targetUnit) {
            return setFieldError('conversion', 'Could not parse input.');
          }

          if (!convert().from(unit).possibilities().includes(targetUnit)) {
            return setFieldError(
              'conversion',
              `Cannot convert ${unit} to ${targetUnit}`
            );
          }

          const value = parseFloat(rawValue);

          if (isNaN(value)) {
            return setFieldError('conversion', `Could not parse value.`);
          }

          pushEntry({
            id: uniqueId(),
            unit,
            targetUnit,
            value
          });
        } else {
          const [rawValue, unit] = vals.conversion.split(/\s+/);

          if (!rawValue || !unit) {
            return setFieldError('conversion', 'Could not parse input.');
          }

          const value = parseFloat(rawValue);

          if (isNaN(value)) {
            return setFieldError('conversion', `Could not parse value.`);
          }

          if (!convert().possibilities('length').includes(unit)) {
            return setFieldError('conversion', `Unsupported unit ${unit}`);
          }

          pushEntry({
            id: uniqueId(),
            unit,
            targetUnit: unit,
            value
          });
        }
      }
    });
  const onChangeDenominator = useDebounce((event) => {
    const value = parseFloat(event.target.value);

    if (!value || isNaN(value)) {
      return false;
    } else {
      updateDenominator(value);
    }
  });

  return (
    <Layout title="Convert">
      <h1 className="mt-2">Convert Units</h1>
      <Card bg="light" className="my-2">
        <Card.Body className="d-flex align-items-baseline">
          <h5 className="me-2">Scale</h5>
          <Form>
            <InputGroup>
              <InputGroup.Text>1 :</InputGroup.Text>
              <Form.Control
                type="number"
                onChange={onChangeDenominator}
                defaultValue={denominator}
                style={{ textAlign: 'right', width: 75 }}
              />
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
      <Card className="my-2">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={8} sm={9} lg={10}>
                <Form.Control
                  type="text"
                  name="conversion"
                  placeholder="Enter expression"
                  onChange={handleChange}
                  value={values.conversion}
                  isInvalid={Boolean(errors.conversion)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.conversion}
                </Form.Control.Feedback>
              </Col>
              <Col xs={4} sm={3} lg={2} className="d-flex justify-content-end">
                <Button type="submit" variant="success">
                  Convert
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card className="my-2">
        <Card.Body>
          <Card.Title>
            <Row>
              <Col xs={8}>History</Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button variant="danger" onClick={clearEntries}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <Row>
            {entries.length ? (
              entries.map((entry) => (
                <Col xs={12} key={entry.id}>
                  <span>
                    {entry.value} {entry.unit}
                  </span>
                  <FontAwesomeIcon icon={faArrowRightLong} className="mx-3" />
                  <span>
                    {entry.result.toFixed(2)} {entry.targetUnit}
                  </span>
                </Col>
              ))
            ) : (
              <Col xs={12}>No entries.</Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Layout>
  );
}
