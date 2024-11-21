import React from 'react';
import { Layout as AntLayout } from 'antd';
import styles from './Layout.module.less';
import { Sidebar } from '@/wigets/sidebar/ui/SideBar.tsx';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.appWrapper}>
      <AntLayout className={styles.layoutWrapper}>
        <Sidebar />
        <Content className={styles.contentWrapper}>{children}</Content>
      </AntLayout>
    </div>
  );
};
