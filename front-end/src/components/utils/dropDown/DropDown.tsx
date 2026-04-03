import * as React from "react";

interface DropDownProps {
  menuItems: { label: string; href?: string; onClick?: () => void }[];
  title?: string;
  icon?: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({ menuItems, title, icon }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-Green50 border border-solid border-Green200 px-4 py-2 text-black hover:bg-Green200 focus:outline-none cursor-pointer"
      >
        {icon ? (
          icon
        ) : (
          <>
            {title || "Menu"}
            <svg
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-48 origin-top-right border border-solid border-Green200 rounded-md bg-white shadow-lg ring-1 ring-black/5 shadow-Green400 z-20">
          <div className="py-1">
            {menuItems.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-Green50"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-Green50 cursor-pointer"
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
