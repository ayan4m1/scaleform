import { debounce } from 'lodash-es';
import { useCallback, useRef } from 'react';

export const useDebounce = (handler, interval = 250) => {
  const ref = useRef(debounce(handler, interval));
  const onHandled = useCallback((e) => ref.current(e), [ref]);

  return onHandled;
};
