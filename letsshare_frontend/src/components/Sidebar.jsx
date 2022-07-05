import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

import logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const categories = [
  {
    name: "Animals",
  },
  {
    name: "Wallpapers",
  },
  {
    name: "Photography",
  },
  {
    name: "Gaming",
  },
  {
    name: "Coding",
  },
  {
    name: "Other",
  },
];

const Sidebar = ({ user, setToggleSidebar }) => {
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (setToggleSidebar) setToggleSidebar(false);
  };

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((err) => console.error(err.message));
  };

  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <NavLink
            to="/create-pin"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <IoMdAdd className="bg-black text-white " /> Create Pin
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/categories/${category.name}`}
              key={category.name}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <div>
          <Link
            to={`user-profile/${user._id}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-md hover:shadow-lg mx-3 py-3 capitalize"
            onClick={handleCloseSidebar}
          >
            <p>{user.username}</p>
            <IoIosArrowForward />
          </Link>
          <Link
            to={`user-profile/${user._id}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center text-red-500 bg-white rounded-lg hover:shadow-md mx-3 capitalize"
            onClick={handleLogout}
          >
            <p>Sign Out</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
