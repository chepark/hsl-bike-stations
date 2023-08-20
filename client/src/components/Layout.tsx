import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

function Layout() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center md:container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
