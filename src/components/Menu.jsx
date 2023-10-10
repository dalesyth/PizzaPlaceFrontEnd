import { useState, useEffect } from "react";
import { getAllToppings } from "./api/toppings";
import { getAllSauces } from "./api/sauces";
import { getAllCrusts } from "./api/crusts";

const Menu = () => {
  const [toppings, setToppings] = useState([]);
  const [crusts, setCrusts] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const toppingsList = await getAllToppings();
        const saucesList = await getAllSauces();
        const crustsList = await getAllCrusts();

        setToppings(toppingsList);
        setSauces(saucesList);
        setCrusts(crustsList);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getMenuItems();
  }, []);

  const toppingsList = toppings.map((topping) => topping.title).join(", ");
  const saucesList = sauces.map((sauce) => sauce.title).join(", ");
  const crustsList = crusts.map((crust) => crust.title).join(", ");

  return (
    <>
        <div className="flex justify-center">
            <button className="bg-green-500 p-2 rounded-lg text-gray-100 font-bold hover:bg-green-600">Order Online</button>
        </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-8 shadow-lg">
              <div className="font-extrabold mb-1">Toppings:</div>
              <p>{toppingsList}</p>
            </div>
            <div className="mb-8 shadow-lg">
              <div className="font-extrabold mb-1">Sauces:</div>
              <p>{saucesList}</p>
            </div>
            <div className="mb-8 shadow-lg">
              <div className="font-extrabold mb-1">Crusts:</div>
              <p>{crustsList}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Menu;
