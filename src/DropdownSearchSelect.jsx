import React, { useState, useEffect, useRef } from "react";

const DropdownSearchSelect = ({
  options = [],
  value = "",
  onChange,
  placeholder = "Select an option",
  searchFields = [],
  displayFields = ["title"],
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);

  const selectedOption = options.find((opt) => opt.id == value);

  const formatDisplay = (option) =>
    displayFields
      .map((field) => option[field])
      .filter(Boolean)
      .join(" - ");

  const filteredOptions = options.filter((option) =>
    searchFields.some((field) => {
      const fieldValue = option[field];
      if (!fieldValue) return false;
      return fieldValue
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchQuery.toLowerCase().replace(/\s+/g, ""));
    })
  );

  const handleSelect = (option) => {
    onChange(option.id);
    setSearchQuery("");
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (filteredOptions.length === 1) {
      onChange(filteredOptions[0].id);
    }
  }, [searchQuery]);

  return (
    <div className="mb-2 relative" ref={ref}>
      {/* Dropdown Toggle */}
      <div
        className="relative border border-gray-300 mt-1 rounded"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <div className="p-2 cursor-pointer bg-white rounded flex justify-between items-center font-primary">
          <span>
            {selectedOption ? formatDisplay(selectedOption) : placeholder}
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown List */}
        {dropdownOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-full border-b border-gray-300 outline-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100 font-primary"
                >
                  {formatDisplay(option)}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No options found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSearchSelect;
