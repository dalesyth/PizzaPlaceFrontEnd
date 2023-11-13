import { useStaticData } from "../contexts/StaticDataProvider";
import MenuItemList from "../components/MenuItemsList";
import SideItemList from "../components/SideItemsList";
import OrderButton from "../components/OrderButton";

const Menu = () => {
  const {
    crusts,
    sauces,
    toppings,
    sides,
    isLoadingToppings,
    isLoadingSauces,
    isLoadingCrusts,
    isLoadingSides,
  } = useStaticData();

  return (
    <>
      <div className="flex justify-center pb-6">
        <OrderButton />
      </div>
      <p className="pizzas-heading">Pizzas</p>
      <div className="shadow-lg">
        {!isLoadingToppings && (
          <MenuItemList
            title="Toppings"
            items={toppings.map((topping) => topping.title)}
          />
        )}
        {!isLoadingSauces && (
          <MenuItemList
            title="Sauces"
            items={sauces.map((sauce) => sauce.title)}
          />
        )}
        {!isLoadingCrusts && (
          <MenuItemList
            title="Crusts"
            items={crusts.map((crust) => crust.title)}
          />
        )}
      </div>
      <p className="sides-heading">Sides</p>
      <div>
        {!isLoadingSides && (
          <SideItemList
            title="Side Orders"
            items={sides.map((side) => ({
              title: side.title,
              price: side.price,
            }))}
          />
        )}
      </div>
    </>
  );
};

export default Menu;
