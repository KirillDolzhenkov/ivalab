import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Sidebar.module.less';

const { Sider } = AntLayout;

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Расходы</Link>
    },
    {
      key: '/categories',
      label: <Link to="/categories">Категории</Link>
    },
    {
      key: '/tags',
      label: <Link to="/tags">Теги</Link>
    }
  ];

  return (
    <Sider collapsed={collapsed} onCollapse={setCollapsed} theme="light" width={styles.width}>
      <Menu mode="inline" selectedKeys={[location.pathname]} className={styles.menu} items={menuItems} />
    </Sider>
  );
};
