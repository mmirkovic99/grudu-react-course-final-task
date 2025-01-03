import { useCallback } from "react";

const useInputHandlers = (state: any, setState: any) => {
  const handleInputChange = useCallback(
    (field, event) => {
      const { value } = event.target;
      setState((prev: any) => ({
        ...prev,
        [field]: {
          ...prev[field],
          value,
        },
      }));
    },
    [setState]
  );

  const handleInputTouch = useCallback(
    (field) => {
      if (!state[field]?.value) {
        setState((prev: any) => ({
          ...prev,
          [field]: {
            ...prev[field],
            error: `${
              field.charAt(0).toUpperCase() + field.slice(1)
            } is required`,
          },
        }));
      }
    },
    [state, setState]
  );

  const setError = useCallback(
    (field, errorMessage) => {
      setState((prev: any) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: errorMessage,
        },
      }));
    },
    [setState]
  );

  const resetErrorMessages = useCallback(() => {
    const keys = Object.keys(state);
    keys.forEach((key) => setError(key, ""));
  }, [state]);

  const resetState = useCallback(() => {
    const keys = Object.keys(state);
    keys.forEach((key) =>
      setState((prev: any) => ({
        ...prev,
        [key]: {
          ...prev[key],
          value: prev[key].error ? prev[key].value : "",
        },
      }))
    );
  }, [state]);

  return {
    handleInputChange,
    handleInputTouch,
    setError,
    resetErrorMessages,
    resetState,
  };
};

export default useInputHandlers;
