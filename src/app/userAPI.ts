import { Credentials } from "../interfaces/credentials.interface";
import { User, UserRaw } from "../interfaces/user.interface";
import { NESTJS_URL } from "../url.constants";
import { post } from "../utils/http.utils";
import { normalizeUser } from "../utils/user.utils";

export function loginRequest(credentials: Credentials): Promise<User> {
  return post<UserRaw>(`${NESTJS_URL}/login`, credentials).then(
    (user: UserRaw) => normalizeUser(user)
  );
}

export function createUserRequest(credentials: Credentials): Promise<User> {
  return post<UserRaw>(`${NESTJS_URL}/createUser`, credentials).then(
    (user: UserRaw) => normalizeUser(user)
  );
}
