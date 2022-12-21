export type TagListParams = {
  query?: string;
  all_fields?: boolean;
};

export type TagListNameOnlyResult = string[];
export type TagListAllFieldsResult = TagListAllFields[];
export type TagListResult = TagListNameOnlyResult | TagListAllFieldsResult;

export type TagListAllFields = {
  vocabulary_id: string;
  display_name: string;
  id: string;
  name: string;
};
