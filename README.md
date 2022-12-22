# Description

API client module for https://www.data.go.jp written in Typescript.

For more detail info about the API, visit https://www.data.go.jp/for-developer/for-developer

# Installation

```sh
## npm
npm i @hirotoni/datagojp-apiclient-typescript
## yarn
yarn add @hirotoni/datagojp-apiclient-typescript
```

# Usage

```ts
import { ApiClient } from "@hirotoni/datagojp-apiclient-typescript";

const client = new ApiClient();
client
  .fetchGroupList({
    all_fields: true,
    order_by: "name",
  })
  .then((data) => {
    if (data.success) {
      console.log(data.result);
    }
  });
```
