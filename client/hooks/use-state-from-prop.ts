import {useEffect, useState} from 'react';

export function useStateFromProp<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue] as [typeof value, typeof setValue];
}
