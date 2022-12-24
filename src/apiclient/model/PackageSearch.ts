import { Package } from "./common";

export type PackageSearchParams = {
  q: string;
  fq?: string;
  sort?: string;
  rows?: number;
  start?: number;
  facet?: boolean;
  ["facet.mincount"]?: number;
  ["facet.limit"]?: number;
  ["facet.field"]?: string[];
};

export type PackageSearchResult = {
  count: number;
  facets: {};
  results: Package[];
  search_facets: {};
  sort: string;
};
