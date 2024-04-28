import { GymsContext } from "../context/GymsContext";
import { useContext } from "react";

export const useGymsContext = () => {
  const context = useContext(GymsContext);

  if (!context) {
    throw Error("useGymsContext must be use inside an GymsContextProvider");
  }

  return context;
};
