import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery(BASE_URL);

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["USERS"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
