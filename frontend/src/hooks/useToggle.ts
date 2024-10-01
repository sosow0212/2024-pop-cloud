import React, { useCallback, useState } from "react";

const useToggle = (
  initialState = false,
): [boolean, React.MouseEventHandler<Element>] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback<React.MouseEventHandler<Element>>((event) => {
    event.preventDefault();
    setState((prevState) => !prevState);
  }, []);

  return [state, toggle];
};

export default useToggle;
