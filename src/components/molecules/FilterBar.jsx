import React from "react";
import { cn } from "@/utils/cn";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  filters, 
  onFilterChange,
  categories,
  onClearFilters,
  className 
}) => {
  const hasActiveFilters = filters.status !== "all" || filters.priority !== "all" || filters.category !== "all";

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-4", className)}>
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Status">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </FormField>

          <FormField label="Priority">
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange("priority", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </FormField>

          <FormField label="Category">
            <select
              value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.Id} value={category.Id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <ApperIcon name="X" size={16} />
            <span>Clear Filters</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;