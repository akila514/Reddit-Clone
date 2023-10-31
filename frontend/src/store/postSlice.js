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

    getPostById: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
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

    postComment: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}/comments`,
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
  useGetPostByIdQuery,
  usePostCommentMutation,
} = postSlice;
