import { createContext, useReducer } from "react";

export const GymsContext = createContext();

export const gymsReducer = (state, action) => {
  switch (action.type) {
    case "SET_GYMS":
      return {
        gyms: action.payload,
      };
    case "CREATE_GYM":
      return {
        gyms: [action.payload, ...state.gyms],
      };
    case "DELETE_GYM":
      return {
        gyms: state.gyms.filter((g) => g._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const GymsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gymsReducer, {
    gyms: [],
  });

  return (
    <GymsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GymsContext.Provider>
  );
};
