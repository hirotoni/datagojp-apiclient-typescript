import { ApiClient } from ".";

describe("api client test", () => {
  const client = new ApiClient();

  describe("PackageList", () => {
    test("need no param for this endpoint", async () => {
      const data = await client.fetchPackageList();
      expect(data.success).toBe(true);
    });
  });

  describe("CurrentPackageListWithResource", () => {
    test("without params", async () => {
      const data = await client.fetchCurrentPackageListWithResource();
      expect(data.success).toBe(true);
    });

    test("with params: limit, page", async () => {
      // ===== check if limit option works =====
      const page1 = await client.fetchCurrentPackageListWithResource({ limit: 11, page: 1 });
      expect(page1.success).toBe(true);
      expect(page1.result.length).toBe(11);

      // ===== check if page option works =====
      const page2 = await client.fetchCurrentPackageListWithResource({ limit: 11, page: 2 });
      expect(page2.success).toBe(true);
      // console.log(page1.result[0].id, page2.result[0].id);
      expect(page1.result[0].id).not.toEqual(page2.result[0].id);
    });
  });

  describe("GroupList", () => {
    test("without params", async () => {
      const data = await client.fetchGroupList();
      expect(data.success).toBe(true);
    });

    test("with params: all_fields", async () => {
      const data = await client.fetchGroupList({ all_fields: true });
      expect(data.success).toBe(true);

      // ===== check if the result has id and name key =====
      expect(Object.prototype.toString.call(data.result)).toBe("[object Array]");
      const keys = Object.keys(data.result[0]);
      expect(keys.length).toBeGreaterThan(0);
      expect(keys.includes("id") && keys.includes("name")).toBe(true);
    });

    test("with params: order_by", async () => {
      const data = await client.fetchGroupList({ order_by: "name" });
      expect(data.success).toBe(true);

      // ===== check if result array is already sorted alphabetically =====
      const sorted = data.result.sort();
      expect(data.result).toEqual(sorted);
    });

    test("with params: groups", async () => {
      const target = ["gr_1700"];
      const data = await client.fetchGroupList({ groups: target });
      expect(data.result).toEqual(target);
    });
  });

  describe("OrganizationList", () => {
    test("without params", async () => {
      const data = await client.fetchOrganizationList();
      expect(data.success).toBe(true);
    });

    test("with params: all_fields", async () => {
      const data = await client.fetchOrganizationList({ all_fields: true });
      expect(data.success).toBe(true);

      // ===== check if the result has id and name key =====
      expect(Object.prototype.toString.call(data.result)).toBe("[object Array]");
      const keys = Object.keys(data.result[0]);
      expect(keys.length).toBeGreaterThan(0);
      expect(keys.includes("id") && keys.includes("name")).toBe(true);
    });

    test("with params: order_by", async () => {
      const data = await client.fetchOrganizationList({ all_fields: true });
      expect(data.success).toBe(true);

      // ===== check if result array is already sorted alphabetically =====
      const sorted = data.result.sort();
      expect(data.result).toEqual(sorted);
    });

    test("with params: organizations", async () => {
      const target = ["org_2200", "org_0300"];
      const data = await client.fetchOrganizationList({
        organizations: target,
      });
      expect(data.success).toBe(true);
      expect(data.result).toEqual(target);
    });

    test("with params: organizations, all_fields", async () => {
      const target = ["org_2200", "org_0300"];
      const data = await client.fetchOrganizationList({
        organizations: target,
        all_fields: true,
      });
      expect(data.success).toBe(true);
      // const a = data.result as Organization[];
      expect(data.result).toEqual(target);
    });
  });

  describe("LicenseList", () => {
    test("without params", async () => {
      const data = await client.fetchLisenceList();
      expect(data.success).toBe(true);
    });
  });

  describe("TagList", () => {
    test("without params", async () => {
      const data = await client.fetchTagList();
      expect(data.success).toBe(true);
    });

    test("with params: all_fields", async () => {
      const data = await client.fetchTagList({ all_fields: true });
      expect(data.success).toBe(true);

      // ===== check if the result has id and name key =====
      expect(Object.prototype.toString.call(data.result)).toBe("[object Array]");
      const keys = Object.keys(data.result[0]);
      expect(keys.length).toBeGreaterThan(0);
      expect(keys.includes("id") && keys.includes("name")).toBe(true);
    });

    test("with params: query, all_fields", async () => {
      const data = await client.fetchTagList({ query: "5G", all_fields: true });
      expect(data.success).toBe(true);

      // ===== check if the result has id and name key =====
      expect(Object.prototype.toString.call(data.result)).toBe("[object Array]");
      const keys = Object.keys(data.result[0]);
      expect(keys.length).toBeGreaterThan(0);
      expect(keys.includes("id") && keys.includes("name")).toBe(true);

      // ===== check if the result has only queried data =====data.result;
      // TODO typing
      // expect(data.result.every((d) => d["name"].includes("5G")));
    });
  });

  describe("PackageShow", () => {
    test("required params: id", async () => {
      const data = await client.fetchPackageShow({ id: "caa_20141128_0003" });
      expect(data.success).toBe(true);
      // console.log(data.result);
    });
  });

  describe("ResourceShow", () => {
    test("required params: id", async () => {
      const data = await client.fetchResourceShow({ id: "59f6b00b-e92c-4ef3-9a47-813690cd5e84" });
      expect(data.success).toBe(true);
      // console.log(data.result);
    });
  });

  describe("GroupShow", () => {
    test("required params: id", async () => {
      const predata = await client.fetchGroupList();
      const data = await client.fetchGroupShow({ id: predata.result[0] as string });
      expect(data.success).toBe(true);
    });
  });

  describe("OrganizationShow", () => {
    test("required params: id", async () => {
      const predata = await client.fetchOrganizationList();
      const data = await client.fetchOrganizationShow({ id: predata.result[0] });
      expect(data.success).toBe(true);
    });
  });

  describe("GroupPackageShow", () => {
    test("required params: id`", async () => {
      const predata = await client.fetchGroupList();
      const data = await client.fetchGroupPackageShow({ id: predata.result[0] as string });
      expect(data.success).toBe(true);
    });
  });

  describe("TagShow", () => {
    test("required params: id", async () => {
      const predata = await client.fetchTagList();
      const data = await client.fetchTagShow({ id: predata.result[0] as string });
      expect(data.success).toBe(true);
    });
  });

  describe("PackageSearch", () => {
    test("required params: id", async () => {
      const searchQuery = "data";
      const data = await client.fetchPackageSearch({ q: searchQuery });
      expect(data.success).toBe(true);
      expect(data.result.results[8].title.toLowerCase().includes(searchQuery.toLowerCase())).toBe(true);
    });
  });
});
