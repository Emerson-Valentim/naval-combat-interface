const useAuthentication = (retrieveToken = false) => {
  const authenticationState = localStorage.getItem("authentication");

  if (!authenticationState) {
    return {
      isAuthenticated: false,
    };
  }

  if (retrieveToken) {
    const { accessToken } = JSON.parse(authenticationState);

    return {
      isAuthenticated: true,
      accessToken,
    };
  }

  return {
    isAuthenticated: true,
  };
};

export default useAuthentication;
