const SideItemsList = ({ title, items }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-center font-extrabold mb-1">
        {title.toUpperCase()}
      </div>
      {/* <div>{items}</div> */}
      <ul className="leaders">
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex justify-between">
              <span>{item.title}</span>
              <span>{item.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideItemsList;
