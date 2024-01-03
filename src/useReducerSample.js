import React, { useEffectوuseReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "API_SUCCESS":
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { data: null, loading: true });

  useEffect(() => {
    fetch("https://api.example.com/items")
      .then((result) => result.json())
      .then((data) => {
        dispatch({ type: "API_SUCCESS", payload: { data } });
      });
  }, []);

  if (state.loading) return <div>Loading...</div>;
  return <div>{state.data}</div>;
}

export default App;
