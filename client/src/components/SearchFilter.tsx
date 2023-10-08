export type SearchFilterProps = {
  label?: string;
  placeholder: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: string;
  classNames?: string;
};

export default function SearchFilter({
  label,
  placeholder,
  handleChange,
  validation,
  classNames,
}: SearchFilterProps) {
  return (
    <div className={classNames}>
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 invalid:border-red-500"
        aria-placeholder={placeholder}
        onChange={handleChange}
        pattern={validation}
      />
    </div>
  );
}
