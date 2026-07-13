"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setLanguage } from "@/store/slices/languageSlice";
import type { Language } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = Record<string, any>;

export function useLanguage() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.language.current);

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  const getLocalizedField = (obj: AnyObj, field: string): string => {
    const suffix = current === "id" ? "" : `_${current}`;
    const key = `${field}${suffix}`;
    const value = obj[key];
    return typeof value === "string" ? value : "";
  };

  return { current, changeLanguage, getLocalizedField };
}
