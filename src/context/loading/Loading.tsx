import React, { useState } from "react";

import Styled from "./styled";

const FullscreenLoadingContext = React.createContext({
  loading: false,
  setLoading: undefined as any,
});

FullscreenLoadingContext.displayName = "FullscreenLoading";

const FullscreenLoadingContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <FullscreenLoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {loading && <Styled.ZIndexContainer></Styled.ZIndexContainer>}
      {children}
    </FullscreenLoadingContext.Provider>
  );
};

export { FullscreenLoadingContextProvider };

export default FullscreenLoadingContext;
