import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
}

const initialState: UiState = {
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, openModal, closeModal } =
  uiSlice.actions;
export default uiSlice.reducer;
