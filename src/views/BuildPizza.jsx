import React from "react";
import { getAllCrusts } from "../api/crusts";
import { getAllSauces } from "../api/sauces";
import { getAllToppings } from "../api/toppings";
import { useFetchData } from "../hooks/useFetchData";
import { useContext } from "react";
import { CartContext } from "../contexts/Cart";

const BuildPizza = () => {
  const {
    data: crusts,
    isLoading: isLoadingCrusts,
    error: crustError,
  } = useFetchData(getAllCrusts);
  const {
    data: sauces,
    isLoading: isLoadingSauces,
    error: sauceError,
  } = useFetchData(getAllSauces);
  const {
    data: toppings,
    isLoading: isLoadingToppings,
    error: toppingError,
  } = useFetchData(getAllToppings);
  const { addtoCart } = useContext(CartContext);

  console.log("crusts from BuildPizza:", crusts);
  console.log("sauces from BuildPizza:", sauces);
  console.log("toppings from BuildPizza:", toppings);

  return (
    <>
      <div className="border-black border-2 rounded-lg shadow-lg mb-2 p-2 flex justify-between">
        <h1>First, select your crust:</h1>
        <span className="flex text-left w-1/4">
          {isLoadingCrusts ? (
            <p>Loading...</p>
          ) : crustError ? (
            <p>Error loading crusts: {crustError.message}</p>
          ) : (
            <span>
              {crusts.map((crust, crustIndex) => (
                <div key={crustIndex}>{crust.title}</div>
              ))}
            </span>
          )}
        </span>
      </div>
      <div className="border-black border-2 rounded-lg shadow-lg mb-2 p-2 flex justify-between">
        <h1>First, select your sauce:</h1>
        <span className="flex text-left w-1/4">
          {isLoadingSauces ? (
            <p>Loading...</p>
          ) : sauceError ? (
            <p>Error loading sauces: {sauceError.message}</p>
          ) : (
            <span>
              {sauces.map((sauce, sauceIndex) => (
                <div key={sauceIndex}>{sauce.title}</div>
              ))}
            </span>
          )}
        </span>
      </div>
      <div className="border-black border-2 rounded-lg shadow-lg mb-2 p-2 flex justify-between">
        <h1>Finally, choose your toppings:</h1>
        <span className="flex text-left w-1/4">
          {isLoadingToppings ? (
            <p>Loading...</p>
          ) : toppingError ? (
            <p>Error loading toppings: {toppingError.message}</p>
          ) : (
            <span>
              {toppings.map((topping, toppingIndex) => (
                <div key={toppingIndex}>{topping.title}</div>
              ))}
            </span>
          )}
        </span>
      </div>
    </>
  );
};

export default BuildPizza;
