import React, { useEffect, useState } from "react";

interface RefetchContext {
  refetch: () => void;
  reload: number;
}

const RefetchContext = React.createContext<RefetchContext>({
  refetch: () => undefined,
  reload: 0,
});

RefetchContext.displayName = "Refetch";

const RefetchContextProvider: React.FC = ({ children }) => {
  const [reload, setReload] = useState(0);

  const refetch = () => {
    setReload((a) => a + 1);
  };

  return (
    <RefetchContext.Provider value={{ refetch, reload }}>
      {children}
    </RefetchContext.Provider>
  );
};

export { RefetchContextProvider };

export default RefetchContext;
