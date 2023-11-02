import PropTypes from 'prop-types';

const MenuItemList = ({ title, items }) => {
 
  console.log("items from MenuItemList:", items)
  return (
    <div className="mb-8">
      <div className="flex justify-center font-extrabold mb-1">{title.toUpperCase()}:</div>
      {<p>{items.join(", ")}</p>}
    </div>
  );
};

MenuItemList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default MenuItemList;
