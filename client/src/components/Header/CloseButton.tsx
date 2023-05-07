import React from "react";

type Props = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseButton = ({ setShowMenu }: Props) => {
  return (
    <>
      <button
        type="button"
        className="p-1 rounded "
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <svg
          className="w-6 h-6 stroke-white "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </>
  );
};

export default CloseButton;
