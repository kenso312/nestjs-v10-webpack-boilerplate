# NestJS v9 Webpack Boilerplate

## 📓 Commands

### Command Description

```bash
# build the app
$ pnpm build

# format the code
$ pnpm lint

# start the app
$ pnpm start

# run in development mode
$ pnpm start:dev || pnpm dev

# build the app and run in production mode
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

### Running the app for development

```bash
$ git clone <repo>

$ pnpm install

# Fill in require information in .env file
$ cp .env.example .env

# Linux / Mac user may require (allow git hook script executable)
$ chmod +x .husky -R

$ pnpm dev
```

## ⭐ Enhance Coding Quality Tools Used

### ESLint

It statically analyzes your code to help you detect formatting issues and find code inconsistencies, here we extend the ESLint TypeScript recommend rules, most popular JavaScript style [Airbnb](https://github.com/airbnb/javascript), and auto import sorting and shaking plugins.

```text
# Config File
├── .eslintignore
└── .eslintrc.js
```

Other popular JavaScript style:

- [Standard](https://standardjs.com)
- [Google](https://google.github.io/styleguide/jsguide.html)

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

These tools are the wrapper of [Git Hook](https://git-scm.com/book/zh-tw/v2/Customizing-Git-Git-Hooks). Lint-staged enforces you to format your code (run `pnpm lint`) before committing, but the tools will cache the file the already formatted, improve performance. Commitlint enforces your commit message to fit a specific format, here we extend [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) (officially recommend setting).

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
|   ├── commit-msg  # call Commitlint to check commit msg
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

### Alias Path

Using alias path can prevent dirty relative path (e.g. ../../../), also it is easier to import files that in the deep directory (e.g. src/assets/img/testing/...).

```text
# Config File
├── tsconfig.json
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

We use Google JSON guide to be the response format implemented by [filtering](https://docs.nestjs.com/exception-filters) + [interceptor](https://docs.nestjs.com/interceptors), which is the built-in feature of NestJS, to sync with the response format. All exception will be caught by filtering, and all normal return will transfromed by interceptor.

```text
# Related Directory
├── src
|   ├── exception
|   ├── filter
|   └── interceptor
```

### Environment Variable Validation

For environment variable validation, we use [Joi](https://joi.dev/) library, which is recommended by NestJS.

```text
# Config File
├── src
|   └── app.config.ts
```

### HTTP Request

Since [@nestjs/axios](https://github.com/nestjs/axios) default return [Observable](https://rxjs.dev/guide/observable), it does not fit for the common use case (Promise based), so we use a custom module to implement secondary encapsulation of native Axios library, also extract .data from the response to prevent .data.data.data... chaining.

_Reference:_

- [Author Recommandation](https://github.com/nestjs/nest/issues/2613#issuecomment-513141287)

### Pino Logger

We used [nestjs-pino](https://github.com/iamolegga/nestjs-pino) to auto log every request metadata and response time. We also centrlized pino config in `app.config.ts` for `main.js` reuse it.

### Swagger

[@nestjs/swagger](https://github.com/nestjs/swagger) allow you to auto-generate the API document, but here we decouple the document and the service. You can run `pnpm swagger` to generate the schema and put into [Swagger UI](https://github.com/swagger-api/swagger-ui) to host your API document as a static page. We also have two example in `app.controller.ts` to show you how to integrate Google JSON response format.

![Swagger UI Final Output](https://gateway.pinata.cloud/ipfs/QmWVxHGQCJsHER1HLiNpMod67Qys96xN8vULhroFWfXv7v)

### Clustering

We also configured the clustering feature for the service to improve performance. All you need to do is just config the environment variable `CLUSTERING=true`.

## ☑️ Naming Convention

`JS variable / function:` lower camel case [e.g. twoWords]

`JS global const + enum's attributes:` upper case [e.g. TWO_WORDS]

`JS class / interface / type / enum:` pascal case [e.g. TwoWords]

`Asset name (e.g. image):` kebab case [e.g. two-words]

## 📈 Performance Optimization

By default, we used Fastify instead of Express to achieve twice of performance, below is the benchmarks tested by NestJS:

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
