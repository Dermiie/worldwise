import AppNav from './AppNav';
import Logo from './Logo';
import Footer from './Footer';
import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>

      <Outlet></Outlet>

      <footer className={styles.footer}>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default Sidebar;
