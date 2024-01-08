import { createContext } from "react";

export const currentExercise = createContext({
    currentExercise: "",
    setCurrentExercise: () => {}
  });
