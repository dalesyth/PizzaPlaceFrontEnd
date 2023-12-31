import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../contexts/Cart";
import { useStaticData } from "../contexts/StaticDataProvider";

const BuildPizza = () => {
  const {
    crusts,
    sauces,
    toppings,
    isLoadingToppings,
    isLoadingSauces,
    isLoadingCrusts,
    crustError,
    sauceError,
    toppingError,
  } = useStaticData();

  const { addToCart } = useContext(CartContext);

  const [selectedCrust, setSelectedCrust] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleToppingChange = (toppingId) => {
    const isSelected = selectedToppings.includes(toppingId);

    if (isSelected) {
      setSelectedToppings((prevToppings) =>
        prevToppings.filter((topping) => topping !== toppingId)
      );
    } else {
      setSelectedToppings((prevToppings) => [...prevToppings, toppingId]);
    }
  };

  const handleAddToCart = () => {
    if (selectedCrust && selectedSauce) {
      const pizza = {
        title: "Custom Pizza",
        price: 16.99,
        crustId: selectedCrust,
        sauceId: selectedSauce,
        toppings: selectedToppings,
        quantity: 1,
      };

      addToCart(pizza);

      setSelectedCrust(null);
      setSelectedSauce(null);
      setSelectedToppings([]);
    } else {
      console.error("Crust and sauce are required");
    }
  };

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
                <div key={crustIndex}>
                  <input
                    type="radio"
                    id={`crust-${crust.crust_id}`}
                    name="crust"
                    value={crust.crust_id}
                    checked={selectedCrust === crust.crust_id}
                    onChange={() => setSelectedCrust(crust.crust_id)}
                    className="mr-2"
                  />
                  <label htmlFor={`crust-${crust.crust_id}`}>
                    {crust.title}
                  </label>
                </div>
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
                <div key={sauceIndex}>
                  <input
                    type="radio"
                    id={`sauce-${sauce.sauce_id}`}
                    name="sauce"
                    value={sauce.sauce_id}
                    checked={selectedSauce === sauce.sauce_id}
                    onChange={() => setSelectedSauce(sauce.sauce_id)}
                    className="mr-2"
                  />
                  <label htmlFor={`sauce-${sauce.sauce_id}`}>
                    {sauce.title}
                  </label>
                </div>
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
                <div key={toppingIndex}>
                  <input
                    type="checkbox"
                    id={`topping-${topping.topping_id}`}
                    value={topping.topping_id}
                    checked={selectedToppings.includes(topping.topping_id)}
                    onChange={() => handleToppingChange(topping.topping_id)}
                    className="mr-2"
                  />

                  <label htmlFor={`topping-${topping.topping_id}`}>
                    {topping.title}
                  </label>
                </div>
              ))}
            </span>
          )}
        </span>
      </div>
      <div className="flex justify-end mr-6 mt-6">
        <button
          className="h-10 bg-blue-400 text-white font-bold px-1 py-1 rounded-lg hover:bg-blue-600 hover:font-extrabold shadow-lg"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default BuildPizza;
