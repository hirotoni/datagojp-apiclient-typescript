import { Organization } from "./common";

export type OrganizationListParams = {
  order_by?: keyof Organization;
  organizations?: string[];
  all_fields?: boolean;
};
export type OrganizationListResult = string[] | Organization[];
