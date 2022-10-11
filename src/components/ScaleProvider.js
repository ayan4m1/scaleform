import PropTypes from 'prop-types';
import { useState } from 'react';

import { ScaleContext } from 'hooks/useScale';

export default function ScaleProvider({ children }) {
  const [denominator, setDenominator] = useState(1);

  return (
    <ScaleContext.Provider value={{ denominator, setDenominator }}>
      {children}
    </ScaleContext.Provider>
  );
}

ScaleProvider.propTypes = {
  children: PropTypes.node.isRequired
};
