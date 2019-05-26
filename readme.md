# json-yaml-ref-resolver

[![CircleCI](https://circleci.com/gh/en-ken/json-yaml-ref-resolver.svg?style=svg)](https://circleci.com/gh/en-ken/json-yaml-ref-resolver)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Simple `$ref` keyword resolver on json and yaml files.

## Motivation

This app is mainly for merging splitted [OpenApi(Swagger)](https://swagger.io/docs/specification/using-ref/) files.
Splitting API definitions into several files is human readable, but uniting definition files is required when defining APIs like AWS API Gateway.
In addition, [Swagger Editor](https://editor.swagger.io/) is not supported `$ref` descriptions of remote references yet.

There are some `$ref` resolvers for json like [this](https://github.com/whitlockjc/json-refs),  but there doesn't seem to be for yaml.
So, I developed this app, but it simply works to resolve `$ref` for other json/yaml files.

# Installation

```:bash
npm i -g json-yaml-ref-resolver
```

# Usage

Please just specify a entry point file as `<targetFilePath>` and a merged file as `<outputFilepath>`.

```:bash
json-yaml-ref-resolver [options] <targetFilePath> <output
FilePath>

Options:
  -i, --indent <size>  change indent size (default: 2)
```

This app simply expands all `$ref` descriptions and yaml references(`*` and  `&` descriptions), so merged files are redundant to edit directly.