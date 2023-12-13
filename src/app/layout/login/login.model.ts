import {AccountRole} from "../account-info/account.model";

export interface LoginResponse {
  jwt: string,
  role: AccountRole
}

export interface LoginRequest {
  email: string,
  password: string
}
