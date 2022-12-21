import { AxiosHttpClient, HttpClientInterface } from "./http";
import {
  CurrentPackageListWithResourceParams,
  CurrentPackageListWithResourceResult,
} from "./model/CurrentPackageListWithResource";
import { GroupActivityListParams, GroupActivityListResult } from "./model/GroupActivityList";
import { GroupListParams, GroupListResult } from "./model/GroupList";
import { GroupPackageShowParams, GroupPackageShowResult } from "./model/GroupPackageShow";
import { GroupShowParams, GroupShowResult } from "./model/GroupShow";
import { LisenceListParams, LisenceListResult } from "./model/LisenceList";
import { OrganizationActivityListParams, OrganizationActivityListResult } from "./model/OrganizationActivityList";
import { OrganizationListParams, OrganizationListResult } from "./model/OrganizationList";
import { OrganizationShowParams, OrganizationShowResult } from "./model/OrganizationShow";
import { PackageActivityListParams, PackageActivityListResult } from "./model/PackageActivityList";
import { PackageListParams, PackageListResult } from "./model/PackageList";
import { PackageSearchParams, PackageSearchResult } from "./model/PackageSearch";
import { PackageShowParams, PackageShowResult } from "./model/PackageShow";
import {
  RecentlyChangedPackagesActivityListParams,
  RecentlyChangedPackagesActivityListResult,
} from "./model/RecentlyChangedPackageActivityList";
import { ResourceSearchParams, ResourceSearchResult } from "./model/ResourceSearch";
import { ResourceShowParams, ResourceShowResult } from "./model/ResourceShow";
import { TagListParams, TagListResult } from "./model/TagList";
import { TagSearchParams, TagSearchResult } from "./model/TagSearch";
import { TagShowParams, TagShowResult } from "./model/TagShow";

const DEFAULT_ENDPOINT = "https://www.data.go.jp/data/";

export type ApiTypeMap = {
  PackageList: {
    params: PackageListParams;
    result: PackageListResult;
  };
  CurrentPackageListWithResource: {
    params: CurrentPackageListWithResourceParams;
    result: CurrentPackageListWithResourceResult;
  };
  GroupList: {
    params: GroupListParams;
    result: GroupListResult;
  };
  OrganizationList: {
    params: OrganizationListParams;
    result: OrganizationListResult;
  };
  LicenseList: {
    params: LisenceListParams;
    result: LisenceListResult;
  };
  TagList: {
    params: TagListParams;
    result: TagListResult;
  };
  PackageShow: {
    params: PackageShowParams;
    result: PackageShowResult;
  };
  ResourceShow: {
    params: ResourceShowParams;
    result: ResourceShowResult;
  };
  GroupShow: {
    params: GroupShowParams;
    result: GroupShowResult;
  };
  OrganizationShow: {
    params: OrganizationShowParams;
    result: OrganizationShowResult;
  };
  GroupPackageShow: {
    params: GroupPackageShowParams;
    result: GroupPackageShowResult;
  };
  TagShow: {
    params: TagShowParams;
    result: TagShowResult;
  };
  PackageSearch: {
    params: PackageSearchParams;
    result: PackageSearchResult;
  };
  ResourceSearch: {
    params: ResourceSearchParams;
    result: ResourceSearchResult;
  };
  TagSearch: {
    params: TagSearchParams;
    result: TagSearchResult;
  };
  PackageActivityList: {
    params: PackageActivityListParams;
    result: PackageActivityListResult;
  };
  GroupActivityList: {
    params: GroupActivityListParams;
    result: GroupActivityListResult;
  };
  OrganizationActivityList: {
    params: OrganizationActivityListParams;
    result: OrganizationActivityListResult;
  };
  RecentlyChangedPackagesActivityList: {
    params: RecentlyChangedPackagesActivityListParams;
    result: RecentlyChangedPackagesActivityListResult;
  };
};

type ApiPaths = Record<keyof ApiTypeMap, string>;

const APIPATHS: ApiPaths = {
  PackageList: "api/action/package_list",
  CurrentPackageListWithResource: "api/action/current_package_list_with_resources",
  GroupList: "api/action/group_list",
  OrganizationList: "api/action/organization_list",
  LicenseList: "api/action/license_list",
  TagList: "api/action/tag_list",
  PackageShow: "api/action/package_show",
  ResourceShow: "api/action/resource_show",
  GroupShow: "api/action/group_show",
  OrganizationShow: "api/action/organization_show",
  GroupPackageShow: "api/action/group_package_show",
  TagShow: "api/action/tag_show",
  PackageSearch: "api/action/package_search",
  ResourceSearch: "api/action/resource_search",
  TagSearch: "api/action/tag_search",
  PackageActivityList: "api/action/package_activity_list",
  GroupActivityList: "api/action/group_activity_list",
  OrganizationActivityList: "api/action/organization_activity_list",
  RecentlyChangedPackagesActivityList: "api/action/recently_changed_packages_activity_list",
} as const;

export type ApiRequest<K extends keyof ApiTypeMap> = {
  resourceName: K;
  params?: ApiTypeMap[K]["params"];
};

export type ApiResponse<K extends keyof ApiTypeMap> = {
  help: string;
  success: boolean;
  result: ApiTypeMap[K]["result"];
};

export type ApiClientConfig = {
  endpoint?: string;
  httpClient?: HttpClientInterface;
};

export class ApiClient {
  private endpoint: string;
  private httpClient: HttpClientInterface;

  constructor({ endpoint = DEFAULT_ENDPOINT, httpClient = new AxiosHttpClient() }: ApiClientConfig = {}) {
    this.endpoint = endpoint;
    this.httpClient = httpClient;
  }

  private async doRequest<K extends keyof ApiTypeMap>(req: ApiRequest<K>): Promise<ApiResponse<K>> {
    const url = this.endpoint + APIPATHS[req.resourceName];
    const method = "get";
    let params = { ...req.params };

    // ===== WORK AROUND =====
    // datagojp API's array params only accept following format:
    // ?groups=gr_1700&groups= (at least two param name should be given)
    // when array with only single value was given, the API does not work as expected.
    // ?groups=gr_1700 (this responses with empty list)
    // to avoid this, add emptyDummyValue to the array (to be later serialized to ?groups=gr_1700&groups=)
    Object.entries(params).forEach((keyvalue: [string, any]) => {
      const key = keyvalue[0];
      const value = keyvalue[1];

      // const isArray = Object.prototype.toString.call(value) === "[object Array]";
      if (Array.isArray(value) && value.length === 1) {
        const emptyDummyValue = "";
        params = { ...params, [key]: [value, emptyDummyValue] };
      }
    });

    return (await this.httpClient.doRequest(method, url, params)) as ApiResponse<K>;
  }

  async fetchPackageList() {
    const req: ApiRequest<"PackageList"> = {
      resourceName: "PackageList",
    };
    return await this.doRequest(req);
  }

  async fetchCurrentPackageListWithResource(params?: CurrentPackageListWithResourceParams) {
    const req: ApiRequest<"CurrentPackageListWithResource"> = {
      resourceName: "CurrentPackageListWithResource",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchGroupList(params?: GroupListParams) {
    const req: ApiRequest<"GroupList"> = {
      resourceName: "GroupList",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchOrganizationList(params?: OrganizationListParams) {
    const req: ApiRequest<"OrganizationList"> = {
      resourceName: "OrganizationList",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchLisenceList(params?: LisenceListParams) {
    const req: ApiRequest<"LicenseList"> = {
      resourceName: "LicenseList",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchTagList(params?: TagListParams) {
    const req: ApiRequest<"TagList"> = {
      resourceName: "TagList",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchPackageShow(params?: PackageShowParams) {
    const req: ApiRequest<"PackageShow"> = {
      resourceName: "PackageShow",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchResourceShow(params?: ResourceShowParams) {
    const req: ApiRequest<"ResourceShow"> = {
      resourceName: "ResourceShow",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchGroupShow(params?: GroupShowParams) {
    const req: ApiRequest<"GroupShow"> = {
      resourceName: "GroupShow",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchOrganizationShow(params?: OrganizationShowParams) {
    const req: ApiRequest<"OrganizationShow"> = {
      resourceName: "OrganizationShow",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchGroupPackageShow(params?: GroupPackageShowParams) {
    const req: ApiRequest<"GroupPackageShow"> = {
      resourceName: "GroupPackageShow",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchTagShow(params?: TagShowParams) {
    const req: ApiRequest<"TagShow"> = {
      resourceName: "TagShow",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchPackageSearch(params?: PackageSearchParams) {
    const req: ApiRequest<"PackageSearch"> = {
      resourceName: "PackageSearch",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchResourceSearch(params?: ResourceSearchParams) {
    const req: ApiRequest<"ResourceSearch"> = {
      resourceName: "ResourceSearch",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchTagSearch(params?: TagSearchParams) {
    const req: ApiRequest<"TagSearch"> = {
      resourceName: "TagSearch",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchPackageActivityList(params?: PackageActivityListParams) {
    const req: ApiRequest<"PackageActivityList"> = {
      resourceName: "PackageActivityList",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchGroupActivityList(params?: GroupActivityListParams) {
    const req: ApiRequest<"GroupActivityList"> = {
      resourceName: "GroupActivityList",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchOrganizationActivityList(params?: OrganizationActivityListParams) {
    const req: ApiRequest<"OrganizationActivityList"> = {
      resourceName: "OrganizationActivityList",
      params,
    };
    return await this.doRequest(req);
  }

  async fetchRecentlyChangedPackagesActivityList(params?: RecentlyChangedPackagesActivityListParams) {
    const req: ApiRequest<"RecentlyChangedPackagesActivityList"> = {
      resourceName: "RecentlyChangedPackagesActivityList",
      params,
    };
    return await this.doRequest(req);
  }
}
