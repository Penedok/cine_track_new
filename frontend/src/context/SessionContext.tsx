import { createContext, useContext, useState, type ReactNode } from "react";

type SessionContextValue = {
  isSessionModalOpen: boolean;
  openSessionModal: () => void;
  closeSessionModal: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const openSessionModal = () => setIsSessionModalOpen(true);
  const closeSessionModal = () => setIsSessionModalOpen(false);

  return (
    <SessionContext.Provider
      value={{
        isSessionModalOpen,
        openSessionModal,
        closeSessionModal,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession precisa estar dentro de SessionProvider");
  }
  return context;
}
