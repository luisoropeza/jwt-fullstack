import { user } from "../../../intefaces";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<user[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUserAuthenticated: builder.query<user, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserAuthenticatedQuery } = userApi;
