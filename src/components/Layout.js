import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';

import Header from 'components/Header';

export default function Layout({ title = 'Page', children }) {
  return (
    <Fragment>
      <Helmet title={title} titleTemplate="Scaleform - %s" />
      <Header />
      <Container>{children}</Container>
    </Fragment>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};
