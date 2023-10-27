import { USERS_URL } from "../constants";
import apiSlice from "./apiSlice";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = userSlice;
