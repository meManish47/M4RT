import { getUserFromCookies } from "@/helper/helper";
import {
  createUser,
  LoginUser,
  updateUserProfile,
  updateUserRole,
} from "./resolvers/user";

export const resolvers = {
  Query: {
    loginUser: LoginUser,
    currentUser: getUserFromCookies,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
  },
};
