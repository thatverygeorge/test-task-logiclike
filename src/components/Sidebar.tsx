import { ChangeEvent } from 'react';

interface Props {
  className: string;
  tags: string[];
  activeTag: string;
  onChange: (value: string) => void;
}

function Sidebar(props: Props) {
  const { className, tags, activeTag, onChange } = props;

  if (tags.length === 0) {
    return null;
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);
  };

  return (
    <aside className={`${className} sidebar`} onChange={handleChange}>
      {tags.map((tag) => {
        const id = tag.toLowerCase().replaceAll(' ', '-');

        return (
          <label className="sidebar__label" htmlFor={id} key={id}>
            {tag}
            <input
              className="sidebar__input visually-hidden"
              type="radio"
              name="course"
              id={id}
              value={tag}
              defaultChecked={tag === activeTag ? true : false}
            />
          </label>
        );
      })}
    </aside>
  );
}

export default Sidebar;
