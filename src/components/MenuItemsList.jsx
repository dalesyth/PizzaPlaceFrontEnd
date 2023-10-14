
const MenuItemList = ({ title, items }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-center font-extrabold mb-1">{title.toUpperCase()}:</div>
      {<p>{items.join(", ")}</p>}
    </div>
  );
};

export default MenuItemList;
