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

    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    getJoinedCommunities: builder.query({
      query: () => ({
        url: `${USERS_URL}/getallcommunities`,
      }),
    }),

    getRecommendedPosts: builder.query({
      query: () => ({
        url: `${USERS_URL}/getRecommendedPosts`,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetJoinedCommunitiesQuery,
  useGetRecommendedPostsQuery,
} = userSlice;
