import { createContext } from "react";

export const currentExercise = createContext({
    currentExercise: undefined,
    setCurrentExercise: () => {}
  });
