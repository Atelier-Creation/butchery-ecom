import { Link } from "react-router-dom";
import { P } from "../../components/TextComponents";



const IconMenu = ({ items }) => {
  return (
    <div className="icon-menu-wrapper py-2 bg-[#EE1c25] lg:px-10">
      <ul className="flex justify-center gap-6">
        {items.map((item, idx) => (
          <li key={idx} className="flex flex-col items-center">
            <Link to={item.link} className="flex gap-3 items-center group">
              <img
                src={item.icon}
                alt={item.label}
                className="w-8 h-8 mb-1 invert-100 transition-transform duration-200 group-hover:scale-110"
              />
              <P en={item.label.en} ta={item.label.ta} className="text-sm text-gray-100 lg:text-base"/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconMenu;
