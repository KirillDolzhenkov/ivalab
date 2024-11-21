import { Tag } from 'antd';

interface TagRendererProps {
  name: string;
  color: string;
}

export const TagRenderer = ({ name, color }: TagRendererProps) => {
  return <Tag color={color}>{name}</Tag>;
};
