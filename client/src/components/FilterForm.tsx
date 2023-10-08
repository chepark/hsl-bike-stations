import React from 'react';

type FilterFormProps = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonLabel?: string;
  classNames?: string;
};

function FilterForm({
  children,
  handleSubmit,
  buttonLabel,
  classNames,
}: FilterFormProps) {
  return (
    <form onSubmit={handleSubmit} className={classNames}>
      {children}
      {buttonLabel && (
        <button
          className="px-4 py-2 text-white rounded cursor-pointer bg-blue h-fit"
          type="submit"
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
}

export default FilterForm;
