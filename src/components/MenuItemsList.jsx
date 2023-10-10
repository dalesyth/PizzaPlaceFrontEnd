
const MenuItemList = ({ title, items }) => {
  return (
    <div className="mb-8 shadow-lg">
      <div className="font-extrabold mb-1">{title}:</div>
      <p>{items.join(", ")}</p>
    </div>
  );
};

export default MenuItemList;
