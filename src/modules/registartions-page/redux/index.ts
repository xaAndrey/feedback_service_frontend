import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegistrationDto } from "../../../api/registrations/dto";

interface RegistrationsState {
  isFetching: boolean;
  isDone: boolean;
  payload: RegistrationDto[];
  error: string | null; // хитрожопое поле для хранения ошибки
}

const initialState: RegistrationsState = {
  isDone: false,
  isFetching: false,
  payload: [],
  error: null, // как null
};

const registrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    requestRegistrationsData: (state) => {
      state.isFetching = true;
      state.isDone = false;
      state.payload = [];
      state.error = null; 
    },
    receiveRegistrationsData: (
      state,
      action: PayloadAction<RegistrationDto[]>
    ) => {
      state.isFetching = false;
      state.isDone = true;
      state.payload = action.payload;
      state.error = null; 
    },
    requestRegistrationsError: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.isDone = false;
      state.error = action.payload; 
    },
  },
});

export const {
  actions: {
    requestRegistrationsData,
    receiveRegistrationsData,
    requestRegistrationsError,
  },
  reducer: registrationsReducer,
} = registrationsSlice;