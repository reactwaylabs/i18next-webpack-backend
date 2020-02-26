# i18next-webpack-backend

Backend JSON loader for webpack applications.

[![NPM version](https://img.shields.io/npm/v/i18next-webpack-backend.svg?logo=npm)](https://www.npmjs.com/package/i18next-webpack-backend)

[![Build Status](https://img.shields.io/azure-devops/build/reactway/reactway/17/master.svg?logo=azuredevops)](https://dev.azure.com/reactway/ReactWay/_build/latest?definitionId=17&branchName=master)

[![Dependencies](https://img.shields.io/david/reactway/i18next-webpack-backend.svg)](https://david-dm.org/reactway/i18next-webpack-backend)
[![Dev dependencies](https://img.shields.io/david/dev/reactway/i18next-webpack-backend.svg)](https://david-dm.org/reactway/i18next-webpack-backend?type=dev)

## Get started

Install `i18next-webpack-backend` package.

```sh
$ npm install i18next-webpack-backend
```

Add module to your i18n configuration and provide context to load translations from to backend

```ts
import i18next from "i18next";
import { WebpackBackend } from "i18next-webpack-backend";

const i18n = i18next.use(WebpackBackend).init({
    backend: {
        context: require.context("./path/to/translations", true, /\.json$/, "lazy")
    }
});

export default i18n;
```

If you are using multiload adapder:

```ts
import i18next from "i18next";
import { WebpackBackend } from "i18next-webpack-backend";
import BackendAdapter from "i18next-multiload-backend-adapter";

const i18n = i18next.use(BackendAdapter).init({
    backend: {
        backend: WebpackBackend,
        backendOption: {
            context: require.context("./path/to/translations", true, /\.json$/, "lazy")
        }
    }
});

export default i18n;
```

## Translation file structures

### Folder structure

Example translations file structure:

```
.
└── translations/
    ├── en/
    │   ├── commons.json
    │   ├── validation.json
    │   ├── glosarry.json
    │   └── pages/
    │       ├── login.json
    │       └── register.json
    └── lt/
        ├── commons.json
        ├── validation.json
        ├── glosarry.json
        └── pages/
            ├── login.json
            └── register.json
```

## License

Released under the [MIT license](LICENSE).
