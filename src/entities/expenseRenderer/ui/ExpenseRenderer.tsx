import { Tag } from 'antd';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { tagsSelectors } from '@/pages/TagsPage/model/TagsSlice.ts';

interface TagsRendererProps {
  tags?: string[];
}
export const ExpenseRenderer = (props: TagsRendererProps) => {
  const { tags } = props;
  const getTagByName = useAppSelector(tagsSelectors.getTagByName);

  if (!tags) return null;

  return (
    <>
      {tags.map((tag) => {
          const tagData = getTagByName(tag);
          return (
            <Tag key={tag} color={tagData?.color}>
          {tag}
          </Tag>
        );
        })}
    </>
  );
};
