import { User, UserRaw } from "../interfaces/user.interface";

export function normalizeUser(user: UserRaw): User {
  return {
    id: user.id,
    token: user.access_token,
  };
}
