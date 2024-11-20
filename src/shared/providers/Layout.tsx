import React from 'react';
import { Layout as AntLayout } from 'antd';
import styles from './Layout.module.less';
import { Sidebar } from '@/wigets/Sidebar/SideBar.tsx';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout className={styles.layoutWrapper}>
      <Sidebar />
      <AntLayout>
        <Content className={styles.contentWrapper}>
          <div className={styles.container}>{children}</div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
