import React from 'react';

type FormProps = {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonLabel?: string;
  classNames?: string;
};

function Form({ children, handleSubmit, buttonLabel, classNames }: FormProps) {
  return (
    <form data-testid="form" onSubmit={handleSubmit} className={classNames}>
      {children}
      {buttonLabel && (
        <button
          className="px-4 py-2 mt-6 text-white rounded cursor-pointer bg-blue h-fit"
          type="submit"
        >
          {buttonLabel}
        </button>
      )}
    </form>
  );
}

export default Form;
