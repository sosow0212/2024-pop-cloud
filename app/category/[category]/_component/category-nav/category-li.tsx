interface CategoryLiProps<T> {
  title: T;
  handleClick: (value: T, isAdd: boolean) => void;
}

const CategoryLi = <T extends ISearchRegion | IPublicTag>({
  title,
  handleClick,
}: CategoryLiProps<T>) => {
  return (
    <li key={title}>
      <input
        onChange={(v) => {
          handleClick(title, v.target.checked);
        }}
        className="peer hidden"
        type="checkbox"
        name={title}
        id={title}
      />
      <label
        className="cursor-pointer rounded-xl bg-black/55 px-3 py-1 text-white transition-colors hover:bg-black/70 peer-checked:bg-black/95"
        htmlFor={title}
      >
        {title}
      </label>
    </li>
  );
};

export default CategoryLi;
