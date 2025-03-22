import { useFormik } from 'formik';
import { uniqueId } from 'lodash-es';
import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

import { useDebounce } from 'hooks/useDebounce';
import { useHistory } from 'hooks/useHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

import Layout from 'components/Layout';
import { convert } from 'utils/units';

const convertRegex = /([\d.-]+)\s+(\w+)\s+in\s+(\w+)/i;

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
      <h1 className="mt-2">Convert</h1>
      <span>
        Specify a scale factor, then enter one or more expressions. Each
        expression will be scaled appropriately. If you enter an expression such
        as &quot;100 mm in ft,&quot; the scaled value will be converted into the
        target unit.
      </span>
      <Card body className="my-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-2">
            <Form.Label column htmlFor="denominator" sm={2}>
              Scale
            </Form.Label>
            <Col sm={10}>
              <InputGroup style={{ width: 125 }}>
                <InputGroup.Text>1 :</InputGroup.Text>
                <Form.Control
                  defaultValue={denominator}
                  id="denominator"
                  onChange={onChangeDenominator}
                  style={{ textAlign: 'right' }}
                  type="number"
                />
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column htmlFor="conversion" sm={2}>
              Expression
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="conversion"
                isInvalid={Boolean(errors.conversion)}
                name="conversion"
                onChange={handleChange}
                placeholder='"100 mm", "10 m in ft"'
                type="text"
                value={values.conversion}
              />
              {Boolean(errors.conversion) && (
                <Form.Control.Feedback type="invalid">
                  {errors.conversion}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 d-flex justify-content-end">
            <Button type="submit" variant="success">
              Convert
            </Button>
          </Form.Group>
        </Form>
      </Card>
      <Card body className="my-2">
        <Card.Title>
          <Row>
            <Col xs={8}>History</Col>
            <Col className="d-flex justify-content-end" xs={4}>
              <Button onClick={clearEntries} variant="danger">
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <Row>
          {entries.length ? (
            entries.map((entry) => (
              <Col key={entry.id} xs={12}>
                <span>
                  {entry.value} {entry.unit}
                </span>
                <FontAwesomeIcon className="mx-3" icon={faArrowRightLong} />
                <span>
                  {entry.result.toFixed(2)} {entry.targetUnit}
                </span>
              </Col>
            ))
          ) : (
            <Col xs={12}>No entries.</Col>
          )}
        </Row>
      </Card>
    </Layout>
  );
}
