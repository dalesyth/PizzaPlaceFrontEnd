import { createContext, useContext } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { getAllToppings } from "../api/toppings";
import { getAllSauces } from "../api/sauces";
import { getAllCrusts } from "../api/crusts";
import { getAllSides } from "../api/sides";
import { getAllSpecialtyPizzas } from "../api/specialtypizzas";

const StaticDataContext = createContext();

export const useStaticData = () => {
  return useContext(StaticDataContext);
};

const StaticDataProvider = ({ children }) => {
    
  const { data: toppings, isLoading: isLoadingToppings, error: toppingError } =
    useFetchData(getAllToppings);
  const { data: sauces, isLoading: isLoadingSauces, error: sauceError } =
    useFetchData(getAllSauces);
  const { data: crusts, isLoading: isLoadingCrusts, error: crustError } =
    useFetchData(getAllCrusts);
  const { data: sides, isLoading: isLoadingSides, error: sideError } = useFetchData(getAllSides);
  const { data: pizzas, isLoading: isLoadingPizzas, error: pizzaError } = useFetchData(
    getAllSpecialtyPizzas
  );



  const values = {
    crusts,
    sauces,
    toppings,
    sides,
    pizzas,
    isLoadingToppings,
    isLoadingSauces,
    isLoadingCrusts,
    isLoadingSides,
    isLoadingPizzas,
    crustError,
    sauceError,
    toppingError,
    sideError,
    pizzaError,
  };

  return (
    <StaticDataContext.Provider value={values}>
      {children}
    </StaticDataContext.Provider>
  );
};

export default StaticDataProvider;
