import { Group, Organization, Resource, Tag } from "./common";

export type CurrentPackageListWithResourceParams = {
  limit?: number;
  page?: number;
};

export type CurrentPackageListWithResourceResult = {
  license_title: string;
  maintainer: string;
  relationships_as_object: [];
  private: boolean;
  maintainer_email: string;
  num_tags: number;
  id: string;
  metadata_created: string;
  metadata_modified: string;
  author: string;
  author_email: string;
  state: string;
  version: any;
  creator_user_id: string;
  type: string;
  resources: Resource[];
  num_resources: number;
  tags: Tag[];
  groups: Group[];
  license_id: any;
  relationships_as_subject: [];
  organization: Organization;
  name: string;
  isopen: boolean;
  url: string;
  notes: string;
  owner_org: string;
  extras: Tag[];
  title: string;
  revision_id: string;
}[];
