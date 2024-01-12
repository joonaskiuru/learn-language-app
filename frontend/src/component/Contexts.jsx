import { createContext } from "react";

export const currentExercise = createContext({
    currentExercise: "",
    setCurrentExercise: () => {}
  });

export const exerciseUpdate = createContext({
  exerciseUpdate: false,
  setExerciseUpdate: () => {}
});

export const authToken = createContext({
  token: false,
  setToken: () => {}
});
