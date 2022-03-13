const useAuthentication = (retrieveTokens = false) => {
  const authenticationState = localStorage.getItem("authentication");

  if (!authenticationState) {
    return {
      isAuthenticated: false,
    };
  }

  if (retrieveTokens) {
    const { accessToken, refreshToken } = JSON.parse(authenticationState);

    return {
      isAuthenticated: true,
      accessToken,
      refreshToken,
    };
  }

  return {
    isAuthenticated: true,
  };
};

export default useAuthentication;
