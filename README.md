If you are junior I think this guide will help you understand how to create react app from scratch and dive deep each item and what does it mean. Don't use it if you don't know how to it runs, how to it operates. If have any problem and issues you will lost control and break something

#### Overall this guide below:
1. Create React App - [Link](https://github.com/facebook/create-react-app) : Set up a modern react web app by running one command.
2. TypeScript - [Link](https://www.typescriptlang.org/) : TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
3. ESLint - [Link](https://eslint.org/docs/user-guide/getting-started) : Find and fix problems in your JS,TS code.
4. Prettier - [Link](https://prettier.io/) : code formatter integrated with eslint
5. Unit Test (Jest , React Testing Library, coverage) 
6. Style [SCSS](https://sass-lang.com/) & Stylelint Link](https://stylelint.io/)
7. Git hooks with [Husky](https://github.com/typicode/husky) and [Lint-staged](https://github.com/okonet/lint-staged)

### Step 1: Initialize Your code base with typescript

We use Create React App to initialize a new project
https://create-react-app.dev/docs/getting-started#creating-a-typescript-app

```sh
npx create-react-app my-app --template typescript
yarn create-react-app my-app --template typescript
```

### Step 2: Update Typescript configuration

At the root folder the create-react-app script will generate a file `tsconfig.json`
You can adjust the ts config base on your team refer to this link detail about tsconfig option : https://www.typescriptlang.org/tsconfig

Suggestion : We should use the default configuration recommended by typescript
https://github.com/tsconfig/bases#create-react-app-tsconfigjson

```sh
npm install --save-dev @tsconfig/create-react-app
yarn add --dev @tsconfig/create-react-app
```

Add to your tsconfig.json:

```json
"extends": "@tsconfig/create-react-app/tsconfig.json"
```

The default compilerOptions `01/2022`

```json5
"compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "target": "es5",
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true
}
```

However, You can override or add more config as below

```json
{
  "extends": "@tsconfig/create-react-app/tsconfig.json",
  "compilerOptions": {
    "target": "es6",
    "baseUrl": "src",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "incremental": true
  }
}
```

#### More important options of note:

| Option                           | Value                             | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------- | :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| target                           | es6                               | Modern browsers support all ES6 features, so ES6 is a good choice. You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments.                                                                                                                                                                                                                                                                                                                                                                            |
| lib                              | ["dom", "dom.iterable", "esnext"] | TypeScript includes a default set of type definitions for built-in JS APIs (like Math), as well as type definitions for things found in browser environments (like document). TypeScript also includes APIs for newer JS features matching the target you specify; for example the definition for Map is available if target is ES6 or newer..<br> Example React need manipulate with DOM so we will include 2 libs "dom" vs "dom.iterable" and we need use some api of es6 like MAP, SET, etc we add "esnext" and it load library necessary for us refer: https://github.com/microsoft/TypeScript/tree/main/lib |
| module                           | esnext                            | Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.<br> With module is esnext, es6, es2020 we can use import & export keywords<br> Module is CommonJS ( for node project ) we must use require keyword                                               |
| allowJs                          | true                              | Allow JavaScript files to be imported inside your project, instead of just .ts and .tsx files.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| allowSyntheticDefaultImports     | true                              | Allow Synthetic Default Imports it allows you to write an import like `import React from "react"` instead of `import * as React from "react"` When the module does not explicitly specify a default export.                                                                                                                                                                                                                                                                                                                                                                                                      |
| esModuleInterop                  | true                              | Allow Synthetic Default Imports it allows you to write an import like `import React from "react"` instead of `import * as React from "react"` When the module does not explicitly specify a default export.                                                                                                                                                                                                                                                                                                                                                                                                      |
| forceConsistentCasingInFileNames | true                              | TypeScript follows the case sensitivity rules of the file system it’s running on. This can be problematic if some developers are working in a case-sensitive file system and others aren’t. If a file attempts to import fileManager.ts by specifying ./FileManager.ts the file will be found in a case-insensitive file system, but not on a case-sensitive file system.                                                                                                                                                                                                                                        |
| jsx                              | react-jsx                         | Controls how JSX constructs are emitted in JavaScript files. This only affects output of JS files that started in .tsx files. <br>`react`: Emit .js files with JSX changed to the equivalent `React.createElement calls`<br>`react-jsx`: Emit .js files with the JSX changed to `_jsx` calls                                                                                                                                                                                                                                                                                                                     |
| moduleResolution                 | node                              | Specify the module resolution strategy: <br>`node` for Node.js’ CommonJS implementation<br>`node12` or `nodenext`'` for Node.js’ ECMAScript Module Support from TypeScript 4.5 onwards                                                                                                                                                                                                                                                                                                                                                                                                                           |
| noFallthroughCasesInSwitch       | true                              | Report errors for fallthrough cases in switch statements. Ensures that any non-empty case inside a switch statement includes either break or return. This means you won’t accidentally ship a case fallthrough bug.                                                                                                                                                                                                                                                                                                                                                                                              |
| resolveJsonModule                | true                              | Allows importing modules with a ‘.json’ extension, which is a common practice in node projects. This includes generating a type for the import based on the static JSON shape.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| skipLibCheck                     | true                              | Skip type checking of default library declaration files.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| strict                           | true                              | The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning this on is equivalent to enabling all of the strict mode family options, which are outlined below. You can then turn off individual strict mode family checks as needed The rules are: `noImplicitAny` `noImplicitThis` `strictNullChecks` `strictPropertyInitialization` `strictBindCallApply` `strictFunctionTypes.`                                                                                                                                                        |
| baseUrl                          | src                               | Lets you set a base directory to resolve non-absolute module names. You can define a root folder where you can do absolute file resolution. E.g. your folder (src/components/Text) you can use absolute path `import Text from "components/Text"`;                                                                                                                                                                                                                                                                                                                                                               |
| noUnusedLocals                   | true                              | Report errors on unused local variables.;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| noUnusedParameters               | true                              | Report errors on unused parameters in functions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| types                            | ...                               | By default all visible `”@types”` packages are included in your compilation. Packages in `node_modules/@types` of any enclosing folder are considered visible. For example, that means packages within `./node_modules/@types/` and so on. <br>If types is specified, only packages listed will be included in the `global scope`                                                                                                                                                                                                                                                                                |
| include                          | ...                               | Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the tsconfig.json file.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| exclude                          | ...                               | Specifies an array of filenames or patterns that should be skipped when resolving include.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### Step 3: Setup linter for code quality

#### What is ESLint?

ESLint statically analyses our code and find the problems. It is present in most of the editors.ESLint fixes are syntax-aware so you won't experience errors introduced by traditional find-and-replace algorithms.
Write your own rules that work alongside ESLint's built-in rules. You can customise ESLint to work exactly the way you need it for your project.

#### What is Prettier?

Prettier is an opinionated code formatter which is compatible with most of the languages. It saves a lot of time. It quickly indents our code on save (depends on VSCode/editor settings).

```sh
npm install prettier eslint --save-dev
yarn add prettier eslint --dev

npx eslint --init
yarn run eslint --init
```

> Select JavaScript -> React -> TypeScript a .eslintrc will be created at the root of your application

> Note: If you're using React v17, you can safely disable the rule in your eslint configuration file "rules": {
> "react/react-in-jsx-scope": "off"
> }

Add plugin recommended

```sh
@typescript-eslint/eslint-plugin - Plugin to lint your ts code
eslint-config-prettier – Turns off all rules that are unnecessary or might conflict with Prettier.
eslint-plugin-prettier - Runs Prettier as an ESLint rule
```

```sh
npm install @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier prettier --save-dev
or
yarn add @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier prettier --dev
```

Edit file `.eslintrc` add extends section & with eslint config I'll use the rule recommended from eslint https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js

```json
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
```

Create `.prettierrc` and paste the below code

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": false,
  "arrowParens": "always"
}
```

After run eslint to check your code base you will catch the two kinds of erros

```js
1. Parsing error: 'import' and 'export' may appear only with 'sourceType: module'
2. Parsing error: Unexpected token module
```

The problems are we try to run the eslint on the ts file and the eslint don't know what exactly what is need to clarify here
the ts file need to parse itself to to js file and the eslint can clarify it so we need add a parser options to eslint can understand what should it do
We will add a parser to eslint config : @typescript-eslint/parser https://www.npmjs.com/package/@typescript-eslint/parser

```sh
npm i --save-dev typescript @typescript-eslint/parser
yarn add -D typescript @typescript-eslint/parser
```

An ESLint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code.

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json",
    "sourceType": "module"
  },
  ...
}
```

#### Another eslint recommended from external sources

https://reactjs.org/docs/hooks-rules.html#eslint-plugin

- ```sh
   npm install eslint-plugin-react-hooks --save-dev
   yarn add eslint-plugin-react-hooks -D
  ```
  ```json
  // Your ESLint configuration
  {
    "plugins": ["react-hooks"],
    "rules": {
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    }
  }
  ```

### Step 4: Setup and running tests & coverage

Create React App uses Jest as its test runner. To prepare for this integration, we did a major revamp of Jest so if you heard bad things about it years ago, give it another try.

Filename Conventions
Jest will look for test files with any of the following popular naming conventions:

```js
Files with .js suffix in __tests__ folders.
Files with .test.js suffix.
Files with .spec.js suffix.
```

From React team (https://reactjs.org/docs/testing.html) recommended tool is React Testing library

**Jest** is a JavaScript test runner that lets you access the DOM via jsdom. While jsdom is only an approximation of how the browser works, it is often good enough for testing React components. Jest provides a great iteration speed combined with powerful features like mocking modules and timers so you can have more control over how the code executes.
https://jestjs.io/docs/getting-started

**React Testing Library** is a set of helpers that let you test React components without relying on their implementation details. This approach makes refactoring a breeze and also nudges you towards best practices for accessibility. Although it doesn’t provide a way to “shallowly” render a component without its children, a test runner like Jest lets you do this by mocking.
https://github.com/testing-library/react-testing-library

Docs : https://testing-library.com/docs/react-testing-library/intro/
Best practices for this lib : https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

Add React testing libs to project's devDependencies:

```sh
npm install --save-dev @testing-library/react @testing-library/react @testing-library/user-event
yarn add --dev @testing-library/react @testing-library/react @testing-library/user-event
```

#### Initializing Test Environment

If your app uses a browser API that you need to mock in your tests or if you need a global setup before running your tests, add a `src/setupTests.ts` to your project. It will be automatically executed before running your tests.

```ts
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
```

#### Add Jest collectCoverageFrom options in the package.json

```json
  "scripts": {
      ...
      "test": "react-scripts test",
      "coverage": "npm test -- --coverage --watchAll=false",
      ...
  }
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!<rootDir>/node_modules/",
      "!src/index.tsx",
      "!src/reportWebVitals.ts",
      "!src/serviceWorker.ts",
      "!src/serviceWorkerRegistration.ts"
    ]
  },
```

#### Eslint for Jest & React Testing Library

The current the eslint will notify errors warning related to jest test E.g

> ESLint: 'test' is not defined.(no-undef)
> ESLint: 'expect' is not defined.(no-undef)

The problem the eslint don't know what is the `test` & `expect` key work come from. We need add a plugin to resolve this problem
`eslint-plugin-jest`: https://github.com/jest-community/eslint-plugin-jest

```sh
npm install --save-dev eslint-plugin-jest
yarn add --dev eslint-plugin-jest
```

Open `.eslintrc` and add `jest` to the plugins list

```sh
{
  "plugins": ["jest"]
}
```

You can also tell ESLint about the environment variables provided by Jest by doing
This is included in all configs shared by this plugin, so can be omitted if extending them.

```sh
{
  "env": {
    "jest/globals": true
  }
}
```

Recommended
This plugin exports a recommended configuration that enforces good testing practices.
To enable this configuration use the extends property in your .eslintrc config file:

```json
{
  "extends": ["plugin:jest/recommended"]
}
```

`eslint-plugin-testing-library` is an ESLint plugin for Testing Library that helps
users to follow best practices and anticipate common mistakes when writing tests.

```json
npm install --save-dev eslint-plugin-testing-library
yarn add --dev eslint-plugin-testing-library
```

Open `.eslintrc` and add `testing-library` to the plugins list

```sh
{
  "plugins": ["testing-library"]
}
```

### Step 5: Setup Style SCSS & Stylelint

Because we are using create-react-app, just add sass as a dev dependency.

```sh
yarn add -D sass
npm install --save-dev sass
```

> LibSass and Node Sass are deprecated. While they will continue to receive maintenance releases indefinitely, there are no plans to add additional features or compatibility with any new CSS or Sass features. Projects that still use it should move onto Dart Sass.

Then just replace/rename all CSS files and corresponding imports to _.scss instead of _.css

#### Setup stylelint https://github.com/stylelint/stylelint

> Stylelint is designed for CSS.
> However, it can be used with PostCSS syntaxes that:
> parse CSS-like languages like SCSS, Less and SugarSS
> extract styles from HTML, JavaScript and Markdown

#### Linting CSS

```sh
npm install --save-dev stylelint stylelint-config-standard
yarn add -D stylelint stylelint-config-standard
```

#### Linting SCSS

```sh
npm install --save-dev stylelint stylelint-config-standard-scss postcss@8
yarn add -D stylelint stylelint stylelint-config-standard-scss postcss@8
```

> Note: postcss@8 dependency required https://github.com/stylelint-scss/stylelint-config-standard-scss/issues/5

Create `.stylelintrc.json` file at the root folder

```json
{
  "extends": "stylelint-config-standard-scss",
  "rules": {
    "max-line-length": 120,
    "no-empty-source": null,
    "indentation": 2,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true
  }
}
```

Add new script `style-lint` to `package.json` scripts.

```json
"style-lint": "stylelint --config=.stylelintrc.json \"src/**/*.scss\" --formatter verbose",
```

### Step 6: Set Up Git hooks with husky and lint-staged

Helpful npm Packages
We will rely on a couple of npm packages that will help us set up git hooks.

The first package is Husky which lets you tie an npm script or CLI command to a git hook in your package.json file. We will only be looking at implementing a pre-commit and pre-push hook, although Husky does support all the git hooks defined in the git documentation.

The second package is lint-staged that you can use to run linting against staged git files only. It’s helpful to run git hooks only on files that you have changed and are trying to commit or push. Running git hooks on all files in a large codebase would be prohibitively slow.

Installing Packages

```sh
npm install husky lint-staged --save-dev
yarn add -D husky lint-staged
```

Show now we have 5 items need to config together

- husky — for using git hooks.
- lint-staged — for running the command before committing .
- prettier — for formatting the code.
- eslint - for checking typescript codebase
- stylelint - for checking style (css, scss) files

All script related below :

```sh
{
  "style-lint": "stylelint --config=.stylelintrc.json \"src/**/*.scss\" --formatter verbose",
  "lint": "eslint --max-warnings=0 --fix --ext .ts,.tsx .",
  "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
}
```

Open the `package.json` and add the `lint-staged` config

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": ["npm run format", "npm run lint"],
    "src/**/*.scss": "npm run style-lint"
  }
}
```

clarify the husky & link-staged running

```sh
git add .
git commit -m "commit with husky and lint-staged"

$ /.bin/lint-staged
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...
✨  Done in 5.89s.
```

Enable gi hook & add pre-commit hook

```sh
npx husky install
npx husky add .husky/pre-commit "yarn lint-staged"
```

So you can see at the root of folder a new folder `.husky` created

```sh
.husky
-- _
    -- .gitignore
    -- husky.sh
-- pre-commit
```

Content of `pre-commit` file

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

