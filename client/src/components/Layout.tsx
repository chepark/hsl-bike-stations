import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { useLocation } from 'react-router-dom';

function Layout() {
  const { pathname } = useLocation();
  const regex = /^\/station\/\d+$|^\/stations$/;
  // If it is Stations or StationDetail page, do not use container.
  const classNames = pathname.match(regex) ? '' : 'md:container';

  return (
    <>
      <Header />
      <div className={`flex flex-col items-center ${classNames}`}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
