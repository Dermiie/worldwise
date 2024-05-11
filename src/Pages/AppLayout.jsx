import styles from './AppLayout.module.css';
import Sidebar from '../components/SideBar';
import Map from '../components/Map';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <Map></Map>
    </div>
  );
}

export default AppLayout;
