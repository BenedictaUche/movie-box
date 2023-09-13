import React from "react";
import { Input } from "@chakra-ui/react";
import {  FaSearch, FaAlignJustify } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <>
      <nav>
        <div className="navWrapper flex justify-between px-10 py-6">
          <div className="logo">
            <img src="../images/moviebox_logo.png" alt="Movie box logo" />
          </div>
          <div className="search-bar">
            <form action="" method="get" className="inline-flex relative">
              <input placeholder="What do you want to search?" size='md' width='auto' className="w-96 px-[1%] py-2 bg-transparent border-[#D1D5DB] border-2 rounded-md"/>
              <div className="flex items-center absolute right-2 bottom-0 top-0">
                <FaSearch className="text-center" />
              </div>
            </form>
          </div>
          <div className="menu inline-flex justify-between">
            <p className="text-white mr-4">Sign In</p>
            <div className="bg-pink-600 rounded-3xl h-[40px] w-[40px] relative"><FaAlignJustify className='absolute text-white m-[0 auto] cursor-pointer m-[0 auto] block right-0 bottom-4 left-3'/></div>
          </div>
        </div>
      </nav>
    </>
  );
}
