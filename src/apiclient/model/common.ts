export type Package = {
  author_email: string;
  author: string;
  creator_user_id: string;
  extras: Tag[];
  groups: Group[];
  id: string;
  isopen: boolean;
  license_id: any;
  license_title: string;
  maintainer_email: string;
  maintainer: string;
  metadata_created: string;
  metadata_modified: string;
  name: string;
  notes: string;
  num_resources: number;
  num_tags: number;
  organization: Organization;
  owner_org: string;
  private: boolean;
  relationships_as_object: [];
  relationships_as_subject: [];
  resources: Resource[];
  revision_id: string;
  state: string;
  tags: Tag[];
  title: string;
  type: string;
  url: string;
  version: any;
};

export type Resource = {
  cache_last_updated: string;
  last_modified_date: string;
  package_id: string;
  datastore_active: boolean;
  id: string;
  size: string;
  copyright: string;
  state: string;
  last_modified: string;
  hash: string;
  description: string;
  format: string;
  mimetype_inner: string;
  url_type: string;
  mimetype: string;
  cache_url: string;
  name: string;
  language: string;
  created: string;
  url: string;
  resource_license_id: string;
  position: number;
  revision_id: string;
  resource_type: string;
};

export type User = {
  email_hash: string;
  about: string;
  capacity: string;
  name: string;
  created: string;
  sysadmin: boolean;
  activity_streams_email_notifications: boolean;
  state: string;
  number_of_edits: number;
  display_name: string;
  fullname: string;
  id: string;
  number_created_packages: number;
};

export type Extra = {
  value: string;
  state: string;
  key: string;
  revision_id: string;
  group_id: string;
  id: string;
};
// export type Extra = {
//   key: string;
//   value: string;
// };

export type Organization = {
  description: string;
  created: string;
  title: string;
  name: string;
  is_organization: boolean;
  state: string;
  image_url: string;
  revision_id: string;
  type: string;
  id: string;
  approval_status: string;
};

export type Tag = {
  vocabulary_id: string;
  state: string;
  display_name: string;
  id: string;
  name: string;
};

export type Group = {
  display_name: string;
  description: string;
  image_display_url: string;
  title: string;
  id: string;
  name: string;
};
