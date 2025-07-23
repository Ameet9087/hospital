// hooks/useFilter.js
import { useMemo } from "react";

// Utility to flatten objects (handles nested properties)
const flattenObject = (obj, prefix = "") => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {});
};

export const useFilter = (items, searchTerm) => {
  return useMemo(() => {
    if (!searchTerm) return items; // If no search term, return full list

    const normalizedSearch = searchTerm.toLowerCase().trim();

    return items.filter((item) => {
      // Flatten the item to handle nested objects
      const flattenedItem = flattenObject(item);

      // Check each value in the flattened object
      return Object.values(flattenedItem).some((value) => {
        // Handle specific data types
        if (value instanceof Date) {
          return value.toISOString().toLowerCase().includes(normalizedSearch); // For Date objects
        }
        if (typeof value === "number") {
          return value.toString().includes(normalizedSearch); // For numbers
        }
        if (typeof value === "string") {
          return value.toLowerCase().includes(normalizedSearch); // For strings
        }
        return false; // Ignore unsupported types
      });
    });
  }, [items, searchTerm]);
};
