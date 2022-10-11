import { useCallback, useState } from 'react';

export const useHistory = () => {
  const [entries, setEntries] = useState([]);
  const pushEntry = useCallback(
    (entry) => setEntries((original) => [...original, entry]),
    [setEntries]
  );

  return { entries, pushEntry };
};
