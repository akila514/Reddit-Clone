import { COMMUNITIES_URL } from "../constants";
import apiSlice from "./apiSlice";

const communitySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findByName: builder.mutation({
      query: (data) => ({
        url: `${COMMUNITIES_URL}/findByName`,
        method: "POST",
        body: data,
      }),
    }),

    createCommunity: builder.mutation({
      query: (data) => ({
        url: `${COMMUNITIES_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useFindByNameMutation, useCreateCommunityMutation } =
  communitySlice;
