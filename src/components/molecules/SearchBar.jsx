import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  debounceMs = 300,
  className,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange) {
        onChange(searchTerm);
      }
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onChange, onSearch]);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:border-gray-400 placeholder:text-gray-400"
        {...props}
      />
    </div>
  );
};

export default SearchBar;