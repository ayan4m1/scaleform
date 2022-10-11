import { useRef } from 'react';
import { debounce } from 'lodash-es';

export const useDebounce = (handler) => useRef(debounce(handler, 250)).current;
