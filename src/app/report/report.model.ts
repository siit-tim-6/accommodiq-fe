import { AccountRole } from '../account/account-info/account.model';

export interface ReportCardDto {
  reason: string;
  reportedUser: Report_UserInfoDto;
  reportingUser: Report_UserInfoDto;
}

export interface Report_UserInfoDto {
  name: string;
  id: number;
  role: AccountRole;
}
