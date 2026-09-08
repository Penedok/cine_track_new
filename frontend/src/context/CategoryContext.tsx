import { createContext, useContext, useState, type ReactNode } from "react";
import type { Category } from "../types/movie";

type CategoryContextValue = {
  isCategoryModalOpen: boolean;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  // Guarda a categoria recém-criada pra quem abriu o modal (ex.: o Dashboard)
  // poder atualizar a própria lista/seleção sem precisar de um novo GET /categoria.
  lastCreatedCategory: Category | null;
  notifyCategoryCreated: (category: Category) => void;
  clearLastCreatedCategory: () => void;
};

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [lastCreatedCategory, setLastCreatedCategory] = useState<Category | null>(null);

  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);
  const notifyCategoryCreated = (category: Category) => setLastCreatedCategory(category);
  const clearLastCreatedCategory = () => setLastCreatedCategory(null);

  return (
    <CategoryContext.Provider
      value={{
        isCategoryModalOpen,
        openCategoryModal,
        closeCategoryModal,
        lastCreatedCategory,
        notifyCategoryCreated,
        clearLastCreatedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory precisa estar dentro de CategoryProvider");
  }
  return context;
}
