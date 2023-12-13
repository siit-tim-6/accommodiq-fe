import {AccountRole} from "../account-info/account.model";

export interface LoginResponse {
  jwt: String,
  role: AccountRole
}

export interface LoginRequest {
  email: String,
  password: String
}
