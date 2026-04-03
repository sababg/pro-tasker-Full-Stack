import * as React from "react";

const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className="absolute left-1/2 -translate-x-1/2 mb-2 
                opacity-0 group-hover:opacity-100 transition border border-solid border-Green300
                bg-white text-black text-xs rounded-2xl px-3 py-2 w-max max-w-xs shadow-Green400 z-50 max-h-120 overflow-auto"
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
