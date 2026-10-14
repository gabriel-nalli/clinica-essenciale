"use client";
import { useEffect, useState } from "react";

// Ano dinâmico: renderiza o ano do build (igual ao servidor, sem hydration mismatch) e
// corrige para o ano real no cliente.
export default function Year({ initial }) {
  const [year, setYear] = useState(initial);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
