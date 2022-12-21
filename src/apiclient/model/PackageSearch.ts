import { Package } from "./common";

export type PackageSearchParams = {
  q: string;
  fq?: string;
  sort?: string;
  rows?: number;
  start?: number;
  facet?: string;
  facet_mincount?: number;
  facet_limit?: number;
  facet_field?: string[];
};

export type PackageSearchResult = {
  count: number;
  facets: {};
  results: Package[];
  search_facets: {};
  sort: string;
};
