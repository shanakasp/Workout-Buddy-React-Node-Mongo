import { useContext } from "react"; // 1
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an AuthContextProvider"
    );
  }

  return context;
};
