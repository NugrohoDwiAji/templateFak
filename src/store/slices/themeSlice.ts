import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ThemeData } from "@/actions/theme.actions";

const defaultTheme: ThemeData = {
  id: "default",
  name: "Biru Klasik",
  isActive: true,
  primaryColor: "blue-600",
  primaryHex: "#2563eb",
  secondaryColor: "slate-100",
  secondaryHex: "#f1f5f9",
  accentColor: "blue-500",
  accentHex: "#3b82f6",
  headerBg: "white",
  headerBgHex: "#ffffff",
  headerText: "gray-800",
  headerTextHex: "#1f2937",
  sidebarBg: "blue-800",
  sidebarBgHex: "#1e40af",
  sidebarText: "white",
  sidebarTextHex: "#ffffff",
  sidebarActive: "white",
  sidebarActiveHex: "#ffffff",
  bodyBg: "gray-50",
  bodyBgHex: "#f9fafb",
  bodyText: "gray-800",
  bodyTextHex: "#1f2937",
  cardBg: "white",
  cardBgHex: "#ffffff",
  cardBorder: "gray-200",
  cardBorderHex: "#e5e7eb",
  buttonPrimary: "blue-600",
  buttonPrimaryHex: "#2563eb",
  buttonSecondary: "gray-200",
  buttonSecondaryHex: "#e5e7eb",
  footerBg: "blue-800",
  footerBgHex: "#1e40af",
  footerText: "white",
  footerTextHex: "#ffffff",
};

interface ThemeState {
  current: ThemeData;
  themes: ThemeData[];
  isLoading: boolean;
}

const initialState: ThemeState = {
  current: defaultTheme,
  themes: [],
  isLoading: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeData>) => {
      state.current = action.payload;
    },
    setThemes: (state, action: PayloadAction<ThemeData[]>) => {
      state.themes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTheme, setThemes, setLoading } = themeSlice.actions;
export default themeSlice.reducer;
