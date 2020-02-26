#!/usr/bin/env node

const fse = require('fs-extra');
const path = require('path');

const newPackageName = process.argv[2];

const PACKAGES_PATH = path.resolve('packages');
const BOILERPLATE_PATH = path.resolve(PACKAGES_PATH, 'boilerplate');
const NEW_PACKAGE_PATH = path.resolve(PACKAGES_PATH, newPackageName);
const NEW_PACKAGE_JSON_PATH = path.resolve(NEW_PACKAGE_PATH, 'package.json');

// Copy bolierplate to new package directory
fse.copySync(BOILERPLATE_PATH, NEW_PACKAGE_PATH);

// Read package.json
const packageJson = fse.readJSONSync(NEW_PACKAGE_JSON_PATH);

const { private, name, ...restPackageJson } = packageJson;

const newPackageJson = {
  name: newPackageName,
  ...restPackageJson,
};

// Write new package.json
fse.writeJSONSync(NEW_PACKAGE_JSON_PATH, newPackageJson, { spaces: 2 });
