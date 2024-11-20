import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import {ArrowRightOutlined} from '@ant-design/icons';
import styles from './Layout.module.less';

const {Sider, Content } = AntLayout;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = React.useState(false);

    const menuItems = [
        { key: '/', label: 'Расходы', icon: <ArrowRightOutlined /> },
        { key: '/categories', label: 'Категории', icon: <ArrowRightOutlined /> },
        { key: '/tags', label: 'Теги', icon: <ArrowRightOutlined /> },
        /*{ key: '/analytics', label: 'Аналитика', icon: <MenuFoldOutlined /> },*/
    ];

    return (
        <AntLayout className={styles.layoutWrapper} >
            <Sider collapsed={collapsed} onCollapse={setCollapsed} theme="light">
                <Menu
                    className={styles.menu}
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems.map((item) => ({
                        key: item.key,
                        icon: item.icon,
                        label: <Link to={item.key}>{item.label}</Link>,
                    }))}
                />
            </Sider>
            <AntLayout>
                <Content className={styles.contentWrapper}>
                    <div className={styles.container}>{children}</div>
                </Content>
            </AntLayout>
        </AntLayout>
    );
};
