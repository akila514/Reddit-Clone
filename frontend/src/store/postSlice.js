import { POSTS_URL } from "../constants";
import apiSlice from "./apiSlice";

const postSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: POSTS_URL,
        method: "POST",
        body: data,
      }),
    }),

    upvotePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}/upvote`,
        method: "POST",
        body: data,
      }),
    }),

    downvotePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}/downvote`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUpvotePostMutation,
  useDownvotePostMutation,
} = postSlice;
