import { createContext, useReducer } from "react";

export const GymsContext = createContext();

export const gymsReducer = (state, action) => {
  switch (action.type) {
    case "SET_GYMS":
      return {
        ...state,
        gyms: action.payload,
      };
    case "SET_GYMS_ON_MAP":
      return {
        ...state,
        gymsOnMap: action.payload,
      };
    case "CREATE_GYM":
      return {
        ...state,
        gyms: [action.payload, ...state.gyms],
      };
    case "DELETE_GYM":
      return {
        ...state,
        gyms: state.gyms.filter((g) => g._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const GymsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gymsReducer, {
    gyms: [],
    gymsOnMap: [],
  });

  return (
    <GymsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GymsContext.Provider>
  );
};
