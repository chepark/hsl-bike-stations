import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BikeIcon, RightArrowIcon } from '../../assets';
import { HamburgerButton } from './HamburgerButton';
import CloseButton from './CloseButton';

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col justify-center h-16 bg-blue">
        {/* Desktop */}
        <div className="hidden text-white md:container md:flex md:flex-row md:justify-between">
          <div className="flex items-center gap-x-2">
            <BikeIcon />
            <div className="cursor-pointer">
              <Link to={'/'}>Helsinki City Bike</Link>
            </div>
          </div>
          <nav>
            <ul className="flex gap-x-8">
              <li>
                <Link to="/journey/add">+Add Jouney</Link>
              </li>
              <li>
                <Link to="station/add">+Add Station</Link>
              </li>
              <li>
                <Link to="journeys">Journeys</Link>
              </li>
              <li>
                <Link to="stations">Bike Stations</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between px-3 text-white md:hidden">
          <div className="flex items-center gap-x-2">
            <BikeIcon />
            <div className="">
              <Link to={'/'}>Helsinki City Bike</Link>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            {showMobileMenu ? (
              <CloseButton setShowMenu={setShowMobileMenu} />
            ) : (
              <HamburgerButton setShowMenu={setShowMobileMenu} />
            )}
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div className="text-blue md:hidden">
          <ul onClick={() => setShowMobileMenu(false)}>
            <li className="flex flex-row items-center justify-between px-3 py-4 border-b-2 border-light-gray-100 hover:bg-light-gray-50">
              <Link to="journeys">Journeys</Link>
              <div>
                <RightArrowIcon />
              </div>
            </li>
            <li className="flex flex-row items-center justify-between px-3 py-4 border-b-2 border-light-gray-100 hover:bg-light-gray-50">
              <Link to="stations">Bike stations</Link>
              <div>
                <RightArrowIcon />
              </div>
            </li>
            <li className="flex flex-row items-center justify-between px-3 py-4 border-b-2 border-light-gray-100 hover:bg-light-gray-50">
              <Link to="">+ Add Journey</Link>
              <div>
                <RightArrowIcon />
              </div>
            </li>
            <li className="flex flex-row items-center justify-between px-3 py-4 border-b-2 border-light-gray-100 hover:bg-light-gray-50">
              <Link to="">+ Add Station</Link>
              <div>
                <RightArrowIcon />
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
