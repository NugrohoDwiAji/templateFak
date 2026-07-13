"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTheme } from "@/store/slices/themeSlice";
import { getActiveTheme, type ThemeData } from "@/actions/theme.actions";

interface ThemeProviderProps {
  children: React.ReactNode;
}

function serializeTheme(data: ThemeData): ThemeData {
  const result = { ...data };
  if (result.createdAt instanceof Date) {
    result.createdAt = result.createdAt.toISOString();
  }
  if (result.updatedAt instanceof Date) {
    result.updatedAt = result.updatedAt.toISOString();
  }
  return result;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.current);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const result = await getActiveTheme();
      if (result.success && result.data) {
        dispatch(setTheme(serializeTheme(result.data)));
      }
      setMounted(true);
    };
    fetchTheme();
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.style.setProperty("--theme-primary", theme.primaryHex);
    root.style.setProperty("--theme-primary-color", theme.primaryColor);
    root.style.setProperty("--theme-secondary", theme.secondaryHex);
    root.style.setProperty("--theme-secondary-color", theme.secondaryColor);
    root.style.setProperty("--theme-accent", theme.accentHex);
    root.style.setProperty("--theme-accent-color", theme.accentColor);

    root.style.setProperty("--theme-header-bg", theme.headerBgHex);
    root.style.setProperty("--theme-header-text", theme.headerTextHex);

    root.style.setProperty("--theme-sidebar-bg", theme.sidebarBgHex);
    root.style.setProperty("--theme-sidebar-text", theme.sidebarTextHex);
    root.style.setProperty("--theme-sidebar-active", theme.sidebarActiveHex);

    root.style.setProperty("--theme-body-bg", theme.bodyBgHex);
    root.style.setProperty("--theme-body-text", theme.bodyTextHex);

    root.style.setProperty("--theme-card-bg", theme.cardBgHex);
    root.style.setProperty("--theme-card-border", theme.cardBorderHex);

    root.style.setProperty("--theme-button-primary", theme.buttonPrimaryHex);
    root.style.setProperty("--theme-button-secondary", theme.buttonSecondaryHex);

    root.style.setProperty("--theme-footer-bg", theme.footerBgHex);
    root.style.setProperty("--theme-footer-text", theme.footerTextHex);
  }, [theme, mounted]);

  return <>{children}</>;
}

export { ThemeProvider };
