import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.id = payload.id
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.email = payload.email
      state.phoneNumber = payload.phoneNumber

      localStorage.setItem("user", JSON.stringify(payload))
    },
    logoutUser: (state) => {
      state.id = initialState.id
      state.firstName = initialState.firstName
      state.lastName = initialState.lastName
      state.email = initialState.email
      state.phoneNumber = initialState.phoneNumber
      localStorage.removeItem("user")
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
