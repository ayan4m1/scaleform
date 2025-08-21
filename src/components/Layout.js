import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import Header from 'components/Header';

export default function Layout({ title = 'Page', children }) {
  return (
    <Fragment>
      <title>Scaleform - {title}</title>
      <Header />
      <Container>{children}</Container>
    </Fragment>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};
