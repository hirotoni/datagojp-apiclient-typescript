export type GroupListParams = {
  order_by?: string;
  groups?: string[];
  all_fields?: boolean;
};

export type GroupListNameOnlyResult = string[];
export type GroupListAllFieldsResult = GroupListAllFields[];
export type GroupListResult = GroupListNameOnlyResult | GroupListAllFieldsResult;

export type GroupListAllFields = {
  display_name: string;
  description: string;
  image_display_url: string;
  package_count: number;
  created: string;
  name: string;
  is_organization: boolean;
  state: string;
  image_url: string;
  type: string;
  title: string;
  revision_id: string;
  num_followers: number;
  id: string;
  approval_status: string;
};
