#!/usr/bin/env node

const { register } = require("esbuild-register/dist/node");
const { unregister } = register({});

require("../scripts/init.ts");

unregister();
