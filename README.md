# Next Packages not Transpiled Example

This is a minimal reproduction of failing to transpile local dependencies in a monorepo
using Lerna, Yarn Workspaces and Flow.

The structure of the project is:
```
root
|
|__ apps/next-app # the next application
|
|__ components/htz-components # shared ui components
|
|__ libs/htz-react-base # A library providing a babel-preset
```

To reproduce the issue:

1. `git clone https://github.com/TxHawks/next-flow-transpile-repro.git`
2. `cd next-flow-transpile-repro`
3. `yarn && yarn bootstrap`

You should see the following error:
```
ModuleParseError: Module parse failed: Unexpected token (3:12)
You may need an appropriate loader to handle this file type.
| // @flow
| import React, { useState, } from 'react';
> import type { Node, } from 'react';
|
| type PropTypes = {
```
