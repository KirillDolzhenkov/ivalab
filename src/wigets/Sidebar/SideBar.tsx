import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Sidebar.module.less';

const { Sider } = AntLayout;

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsed={collapsed} collapsible onCollapse={setCollapsed} theme="light" width={200}>
      <Menu mode="inline" selectedKeys={[location.pathname]} className={styles.menu}>
        <Menu.Item key="/expenses">
          <Link to="/expenses">Расходы</Link>
        </Menu.Item>
        <Menu.Item key="/categories">
          <Link to="/categories">Категории</Link>
        </Menu.Item>
        <Menu.Item key="/tags">
          <Link to="/tags">Теги</Link>
        </Menu.Item>
        {/*<Menu.Item key="analytics">
            <Link to="/analytics">Аналитика</Link>
         </Menu.Item>*/}
      </Menu>
    </Sider>
  );
};
