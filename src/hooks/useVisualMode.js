import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (mode, replace = false) => {
    if (replace === true) {
      history.pop()
    } 
    history.push(mode)
    setHistory(history)
    return setMode(mode)
  }

  const back = () => {
    if (history.length === 1) {
      return setMode(history[0])
    } 
    history.pop()
    setHistory(history)
    return setMode(history[history.length - 1])
  }

  return { mode, transition, back };
}