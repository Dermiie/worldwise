import styles from './AppLayout.module.css';
import Sidebar from '../components/SideBar';
import Map from '../components/Map';
import User from '../components/User';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <Map></Map>
      <User></User>
    </div>
  );
}

export default AppLayout;
