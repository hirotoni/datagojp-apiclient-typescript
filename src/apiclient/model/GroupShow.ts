import { Extra, Group, Tag, User } from "./common";

export type GroupShowParams = {
  id: string;
};

export type GroupShowResult = {
  users: User[];
  display_name: "\u305d\u306e\u4ed6";
  description: "\u4ed6\u306e\u30b0\u30eb\u30fc\u30d7\u306b\u542b\u3081\u308b\u3053\u3068\u304c\u3067\u304d\u306a\u3044\u30c7\u30fc\u30bf\u306e\u30b0\u30eb\u30fc\u30d7\u3067\u3059\u3002";
  image_display_url: "https://www.data.go.jp/img/download_file/group_img/gr_1700.png";
  package_count: 423;
  created: "2014-09-19T09:27:37.766005";
  name: "gr_1700";
  is_organization: false;
  state: "active";
  extras: Extra[];
  image_url: "https://www.data.go.jp/img/download_file/group_img/gr_1700.png";
  groups: Group[];
  type: "group";
  title: "\u305d\u306e\u4ed6";
  revision_id: "c69cb5f4-6e1c-4a21-a44d-b477e3e343be";
  num_followers: 0;
  id: "7e9f3ecc-634d-4c48-85d2-6c54373c1883";
  tags: Tag[];
  approval_status: "approved";
};
