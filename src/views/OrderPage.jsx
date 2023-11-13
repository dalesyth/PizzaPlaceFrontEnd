import { Link } from "react-router-dom";
import PizzaItem from "../components/PizzaItem";
import SideItem from "../components/SideItem";
import { useStaticData } from "../contexts/StaticDataProvider";

const OrderPage = () => {
  const { pizzas, sides, isLoadingPizzas, isLoadingSides } = useStaticData();

  console.log("pizzas:", pizzas);
  console.log("sides:", sides);

  return (
    <>
      {isLoadingPizzas || isLoadingSides ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="pizzas-heading">Pizzas</p>
          <div className="flex justify-center">
            <Link to="/build-pizza" className="link-button mb-2">
              Create Your Own Pizza
            </Link>
          </div>
          <div>
            {pizzas.map((pizza, pizzaIndex) => (
              <PizzaItem key={pizzaIndex} pizza={pizza} />
            ))}
            <p className="sides-heading">Sides</p>
            {sides.map((side, index) => (
              <SideItem key={index} side={side} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default OrderPage;
