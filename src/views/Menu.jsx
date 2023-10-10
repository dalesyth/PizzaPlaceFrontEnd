import { useFetchData } from "../hooks/useFetchData";
import { getAllToppings } from "../api/toppings";
import { getAllSauces } from "../api/sauces";
import { getAllCrusts } from "../api/crusts";
import MenuItemList from "../components/MenuItemsList";

const Menu = () => {
  const { data: toppings, isLoading: isLoadingToppings } =
    useFetchData(getAllToppings);
  const { data: sauces, isLoading: isLoadingSauces } =
    useFetchData(getAllSauces);
  const { data: crusts, isLoading: isLoadingCrusts } =
    useFetchData(getAllCrusts);

  return (
    <>
      
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
    </>
  );
};

export default Menu;
