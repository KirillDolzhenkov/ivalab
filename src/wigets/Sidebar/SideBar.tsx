import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const Sidebar = () => (
    <Menu mode="vertical" style={{ width: 200 }}>
        <Menu.Item key="expenses">
            <Link to="/expenses">Расходы</Link>
        </Menu.Item>
        <Menu.Item key="categories">
            <Link to="/categories">Категории</Link>
        </Menu.Item>
        <Menu.Item key="tags">
            <Link to="/tags">Теги</Link>
        </Menu.Item>
        {/*<Menu.Item key="analytics">
            <Link to="/analytics">Аналитика</Link>
        </Menu.Item>*/}
    </Menu>
);
