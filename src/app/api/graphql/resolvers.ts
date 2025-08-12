import { getUserFromCookies } from "@/helper/helper";
import {
  createUser,
  getAllUsers,
  LoginUser,
  updateUserProfile,
  updateUserRole,
} from "./resolvers/user";
import addProduct, {
  getAllProducts,
  getProductById,
} from "./resolvers/product";
import { createSale } from "./resolvers/sale";

export const resolvers = {
  Query: {
    loginUser: LoginUser,
    currentUser: getUserFromCookies,
    getAllUsers: getAllUsers,
    getAllProducts,
    getProductById,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale
  },
};
