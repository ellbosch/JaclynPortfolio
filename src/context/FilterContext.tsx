import { createContext, useContext, useState, ReactNode } from 'react';
import type { CategoryFilter } from '../data/types';

interface FilterContextType {
  filter: CategoryFilter;
  setFilter: (filter: CategoryFilter) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<CategoryFilter>('all');

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
