import { useEffect, useMemo, useRef, useState } from "react";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";

interface Props {
  users: string[];
  onAdd: (user: string) => void;
}

const UserSearchInput = ({ users, onAdd }: Props) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!users.length) return [];
    return users.filter((u) => u.toLowerCase().includes(query.toLowerCase()));
  }, [query, users]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-blue-400 transition">
        <FiSearch className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
        {query && (
          <button onClick={() => setQuery("")}>
            <FiX className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No users found
            </p>
          ) : (
            filtered.map((user) => (
              <div
                key={user}
                className="flex items-center justify-between px-4 py-2 hover:bg-Green50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-Green100 flex items-center justify-center text-Green400 font-semibold text-sm shrink-0">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{user}</p>
                    <p className="text-xs text-gray-400">{user}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAdd(user);
                    setQuery("");
                    setIsOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-1 text-xs bg-Green300 hover:bg-Green400 text-black px-3 py-1 rounded-lg transition"
                >
                  <FiPlus size={12} />
                  Add
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearchInput;
