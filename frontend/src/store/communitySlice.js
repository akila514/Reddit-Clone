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

    getCommunityById: builder.query({
      query: (eventId) => ({
        url: `${COMMUNITIES_URL}/${eventId}`,
      }),
    }),

    joinCommunity: builder.mutation({
      query: (communityId) => ({
        url: `${COMMUNITIES_URL}/${communityId}/join`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useFindByNameMutation,
  useCreateCommunityMutation,
  useGetCommunityByIdQuery,
  useJoinCommunityMutation,
} = communitySlice;
