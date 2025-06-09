import { useState } from 'react';

export function useFormState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return [state, handleChange] as const;
}
