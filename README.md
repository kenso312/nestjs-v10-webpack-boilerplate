# NestJS v10 Webpack Boilerplate

![Banner](https://gateway.pinata.cloud/ipfs/QmbGrooyAhnBN8cdor9DtTpoZTapKbcWzXQ9GWmAAT8wFb)

![Language](https://img.shields.io/github/languages/top/kenso312/nestjs-v10-webpack-boilerplate)
![License](https://img.shields.io/github/license/kenso312/nestjs-v10-webpack-boilerplate)
![Version](https://img.shields.io/github/package-json/v/kenso312/nestjs-v10-webpack-boilerplate)

## 🔥 Features

- ### 🏆 Graceful Production Deployment

- ### 🧭 Unified API Response Structure

- ### ⚡ Extreme Performance Optimize

- ### 📏 Fully Integrated Coding Quality Tools

## ⚠️ Attention

Although there are advantages to use Webpack bundling your code (especially for serverless applications), there are some constraints, and details [here](https://github.com/nestjs/nest/issues/1706#issuecomment-579248915) (UPDATE: Both examples stated by the NestJS creator have already unblinded the native driver and are good to use now). Therefore, please make sure your application does not contain native bindings library, then you can enjoy the benefits.

### Extra Configuration for Dependency Packages

#### [Bull](https://docs.nestjs.com/techniques/queues)

You should install `copy-webpack-plugin` and copy bull default commands to the output directory when building the code.

```sh
pnpm install -D copy-webpack-plugin
```

```javascript
// webpack.config.js;
const CopyWebpackPlugin = require('copy-webpack-plugin');
// ...
module.exports = {
  plugins: [
    // ...
    new CopyWebpackPlugin({
      patterns: [
        {
          context: 'node_modules/bull/lib/commands',
          from: '**/*.lua',
        },
      ],
    }),
  ];
}
```

#### [Pino Pretty](https://github.com/pinojs/pino-pretty)

By default we assume the application will run in `production` mode after building the app, so if you still using `development` mode you will get the [error](https://github.com/kenso312/nestjs-v10-webpack-boilerplate/issues/31) since you enable pino-pretty and it does not include in the production bundle. Therefore, if you want to use pino-pretty after bundling for any reason, you should install the `pino-webpack-plugin`.

```sh
pnpm install -D pino-webpack-plugin
```

```js
// webpack.config.js
const { PinoWebpackPlugin } = require('pino-webpack-plugin');
// ...
module.exports = {
  // ...
  plugins: [
    // ...
    new PinoWebpackPlugin({ transports: ['pino-pretty'] }),
  ],
};
```

## 📓 Commands

### Commands Description

```bash
# build the app
$ pnpm build

# format the code
$ pnpm lint

# start the app
$ pnpm start

# run in development mode
$ pnpm start:dev || pnpm dev

# build the app and run it in production mode
$ pnpm start:prod || pnpm prod

# generate Swagger JSON schema
$ pnpm swagger

# test both unit test and e2e test
$ pnpm test

# test all the e2e test
$ pnpm test:e2e

# test all the unit test
$ pnpm test:unit
```

### Running Application for Development

```bash
$ git clone <repo>

$ pnpm install

# Fill in require information in .env file
$ cp .env.example .env

# Linux / Mac users may require (allow git hook script executable)
$ chmod +x .husky -R

$ pnpm dev
```

## 📁 Boilerplate Structure

```text
├── ci
│   ├── docker-compose.yaml
│   └── Dockerfile
├── .husky
│   ├── _
│   │   ├── .gitignore
│   │   └── husky.sh
│   ├── commit-msg
│   ├── pre-commit
│   └── pre-push
├── src
│   ├── exception
│   │   ├── index.ts
│   │   └── normal.exception.ts
│   ├── filter
│   │   ├── all-exception.filter.ts
│   │   ├── index.ts
│   │   ├── normal-exception.filter.ts
│   │   └── validator-exception.filter.ts
│   ├── interceptor
│   │   └── response.interceptor.ts
│   ├── modules
│   │   ├── app
│   │   │   ├── dto
│   │   │   │   ├── response
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── version.dto.ts
│   │   │   │   └── index.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.spec.ts
│   │   │   ├── app.service.ts
│   │   │   └── index.ts
│   │   └── http
│   │       ├── http.module.ts
│   │       └── http.service.ts
│   ├── shared
│   │   ├── enums
│   │   │   ├── index.ts
│   │   │   ├── log-level.ts
│   │   │   └── node-env.ts
│   │   ├── interfaces
│   │   │   ├── index.ts
│   │   │   └── response.ts
│   │   └── constants.ts
│   ├── utils
│   │   ├── clustering.ts
│   │   ├── helper.ts
│   │   └── swagger.ts
│   ├── env.d.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   ├── common.ts
│   └── jest.e2e.config.ts
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── .commitlintrc.js
├── .dockerignore
├── .editorconfig
├── .env.example
├── .eslintignore
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── jest.config.ts
├── .lintstagedrc.js
├── nest-cli.json
├── .npmrc
├── package.json
├── pnpm-lock.yaml
├── .prettierrc.js
├── README.md
├── tsconfig.json
└── webpack.config.js
```

## ⭐ Coding Quality Tools Details Description

### ESLint

It statically analyzes your code to help you detect formatting issues and find code inconsistencies, here we extend the ESLint TypeScript recommend rules, the most popular JavaScript style [Airbnb](https://github.com/airbnb/javascript), auto import sorting and shaking plugins.

```text
# Config File
├── .eslintignore
└── .eslintrc.js
```

### Prettier

Similar to ESLint, but mainly focus on auto-formatting, not the code quality. Actually, ESLint can do all the jobs that Prettier can do, but for the formatting part, Prettier does better, so we import both and achieve each of the advantages. About the conflict of the formatting part, we can import `plugin:prettier/recommended` to solve this, but keep in mind that this plugin should extend at the last.

```text
# Config File
└── .prettierrc.js
```

### Editorconfig

It defines a standard code formatting style guide among all the IDEs and editors used within a team of developers. Basically, all the rules in the Editorconfig should sync with Prettier, Editorconfig focus on newly created files, ESLint and Prettier focus on existing files.

```text
# Config File
└── .editorconfig
```

### Husky + Commitlint + Lint-staged

These tools are the wrapper of [Git Hook](https://git-scm.com/book/zh-tw/v2/Customizing-Git-Git-Hooks). Lint-staged enforces you to format your code (run `pnpm lint`) before committing, but the tools will cache the file that is already formatted to improve performance. Commitlint enforces your commit message to fit a specific format, here we extend [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) (officially recommend setting).

```text
# Type: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
# Commitlint Format:

<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

```text
# Config File for Lint-staged
└── .lintstagedrc.js

# Config File for Commitlint
└── .commitlintrc.js

# Config File for Husky
├── .husky
|   ├── commit-msg  # call Commitlint to check the commit message
|   ├── pre-commit  # call Eslint to lint the coding issue
|   └── pre-push    # call Jest to do the unit + e2e test
```

### Git Attributes

To synchronize the end-of-line of the git repository.

```text
# Config File
└── .gitattributes
```

## ⚙️ Other Configuration

### SWC

SWC (stands for Speedy Web Compiler) is a super-fast TypeScript / JavaScript compiler written in Rust. NestJS v10 should be officially support it now, so we replace `ts-loader` to `swc-loader` for better building performance.

### Pnpm

We use preinstall script forcing Pnpm as default package manager because it is a fast and disk space efficient manager compare with Npm and Yarn.

### Webpack

We overwrite the default `webpack.config.js` so that the production build can bundle all required libraries in `main.ts`. For the configuration, we ignored a list of the nestjs-buildin library so that we could build it without error. If you need these libraries for your development, you can comment it in the lazy imports list.

### Alias Path

Using an alias path can prevent dirty relative paths (e.g. ../../../), also it is easier to import files in the deep directory (e.g. src/assets/img/testing/...).

```text
# Config File
└── tsconfig.json
```

### API Response

#### Success Response

```json
{
  "data": {
    "...": "..."
  }
}
```

#### Error Response

```json
{
  "error": {
    "code": 400,
    "message": "..."
  }
}
```

We use Google JSON guide to be the response format implemented by [filtering](https://docs.nestjs.com/exception-filters) + [interceptor](https://docs.nestjs.com/interceptors), which is the built-in feature of NestJS, to sync with the response format. All exceptions will be caught by filtering, and all normal returns will be transformed by the interceptor.

```text
# Related Directory
├── src
|   ├── exception
|   ├── filter
|   └── interceptor
```

### Environment Variables Validation

We use [Joi](https://joi.dev/) library for the validation, which is recommended by NestJS.

```text
# Config File
├── src
|   └── app.config.ts
```

### HTTP Request

Since [@nestjs/axios](https://github.com/nestjs/axios) default return [Observable](https://rxjs.dev/guide/observable), it does not fit the common use case (Promise based), so we use a custom module to implement secondary encapsulation of the native Axios library, also extract .data from the response to prevent .data.data.data... chaining.

_Reference:_

- [Author Recommendation](https://github.com/nestjs/nest/issues/2613#issuecomment-513141287)

### Pino Logger

We used [nestjs-pino](https://github.com/iamolegga/nestjs-pino) to auto-log every request metadata and response time. We also centralized Pino config in `app.config.ts` for `main.ts` to reuse it.

### Swagger

[@nestjs/swagger](https://github.com/nestjs/swagger) allows you to auto-generate the API document, but here we decouple the document and the service. You can run `pnpm swagger` to generate the schema and put it into [Swagger UI](https://github.com/swagger-api/swagger-ui) to host your API document as a static page. We have two examples in `app.controller.ts` to show you how to integrate the Google JSON response format. We also have a GitHub Action example to auto-update the schema and host it to the GitHub Pages. If you do not want this setup, you can just follow [NestJS official guideline](https://docs.nestjs.com/openapi/introduction) to host your document inside the service.

**Attention**:
You do not need to wrap the data object to your DTO for every response, you only have to name your DTO end with 'Res', `swagger.ts` script will auto-wrap for you and display correctly in the Swagger UI.

![Swagger UI Final Output](https://gateway.pinata.cloud/ipfs/QmWVxHGQCJsHER1HLiNpMod67Qys96xN8vULhroFWfXv7v)

### Docker Containerization

We also set up the `Dockerfile` with multi-stage builds to optimize your image size and building time. For the docker-compose config, we also included health checking.

```text
# Config File
├── ci
|   ├── docker-compose.yaml
|   └── Dockerfile
```

### Clustering

We also configured the clustering feature for the service to improve performance. All you need to do is just config the environment variable `CLUSTERING=true`.

## ☑️ Naming Convention

`JS variable / function:` lower camel case [e.g. twoWords]

`JS global const + enum's attributes:` upper case [e.g. TWO_WORDS]

`JS class / interface / type / enum:` pascal case [e.g. TwoWords]

`Asset name (e.g. image):` kebab case [e.g. two-words]

## 📈 Performance Optimization

By default, we used Fastify instead of Express to achieve twice of performance, below are the benchmarks tested by NestJS:

### Express.js

| Stat      | 1%      | 2.5%    | 50%     | 97.5%   | Avg     | Stdev  | Min     |
| --------- | ------- | ------- | ------- | ------- | ------- | ------ | ------- |
| Req/Sec   | 14183   | 14183   | 15767   | 15991   | 15640   | 501.13 | 14182   |
| Bytes/Sec | 3.06 MB | 3.06 MB | 3.41 MB | 3.45 MB | 3.38 MB | 108 kB | 3.06 MB |

### Fastify

| Stat      | 1%      | 2.5%    | 50%     | 97.5%   | Avg     | Stdev   | Min     |
| --------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| Req/Sec   | 19935   | 19935   | 33247   | 34111   | 32030.4 | 4103.84 | 19931   |
| Bytes/Sec | 3.03 MB | 3.03 MB | 5.05 MB | 5.19 MB | 4.87 MB | 624 kB  | 3.03 MB |

_Reference:_

- [Benchmarks Output](https://github.com/nestjs/nest/blob/master/benchmarks/all_output.txt)

## License

This project is licensed under the MIT License, Copyright © 2022. See [LICENSE](./LICENSE) for more information.
