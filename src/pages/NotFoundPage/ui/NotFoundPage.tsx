import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Извините, страница, которую вы посетили, не существует."
    extra={
      <Link to="/">
        <Button type="primary">Вернуться на главную</Button>
      </Link>
    }
  />
);
