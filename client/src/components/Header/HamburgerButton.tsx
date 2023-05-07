import React from "react";

type Props = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HamburgerButton = ({ setShowMenu }: Props) => {
  return (
    <button
      className="p-1 rounded hover:bg-white group"
      onClick={() => setShowMenu((prev) => !prev)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 stroke-white group-hover:stroke-blue"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};
