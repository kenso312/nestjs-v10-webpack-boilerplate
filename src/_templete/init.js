/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const DEST_FOLDER = path.join('src', 'modules');
const ENTITY_FOLDER = path.join('src', 'database', 'entities');
const REPO_FOLDER = path.join('src', 'database', 'repositories');
const TEMPLETE_FOLDER = path.join('src', '_templete');
let MODULE_NAME;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const copyFileAndReplaceVariable = (source, target) => {
  let targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.readFile(source, 'utf8', (readErr, data) => {
    if (readErr) {
      console.log(readErr);
      process.exit(1);
    }

    const result = data
      .replace(/_?templete/g, MODULE_NAME)
      .replace(/Templete/g, capitalizeFirstLetter(MODULE_NAME))
      .replace('{ synchronize: false }', '');

    fs.writeFile(targetFile, result, { flag: 'w' }, (writeErr) => {
      if (writeErr) {
        console.log(writeErr);
        process.exit(1);
      }
    });
  });
};

const copyFolderRecursiveSync = (source, target) => {
  let files = [];

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      if (file === 'init.js') return;

      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, `${target}/${file}`, MODULE_NAME);
        return;
      }

      copyFileAndReplaceVariable(
        curSource,
        `${target}/${file.replace(/_?templete/, MODULE_NAME)}`
      );
      console.log(
        `Created: ${target}/${file.replace(/_?templete/, MODULE_NAME)}`
      );
    });
  }
};

(() => {
  const args = process.argv.slice(2);
  const destFolder = path.join(DEST_FOLDER, args[0]);
  MODULE_NAME = args[0].toLowerCase();

  if (fs.existsSync(destFolder)) {
    console.log('Module Already Exist!');
    process.exit(0);
  }
  copyFolderRecursiveSync(TEMPLETE_FOLDER, destFolder);

  const entityDestFile = path.join(ENTITY_FOLDER, `${MODULE_NAME}.entity.ts`);
  copyFileAndReplaceVariable(
    path.join(ENTITY_FOLDER, '_templete.entity.ts'),
    entityDestFile
  );
  console.log(`Created: ${entityDestFile}`);

  const repoDestFile = path.join(REPO_FOLDER, `${MODULE_NAME}.repository.ts`);
  copyFileAndReplaceVariable(
    path.join(REPO_FOLDER, '_templete.repository.ts'),
    repoDestFile
  );
  console.log(`Created: ${repoDestFile}`);

  const eslintFolder = path.join('node_modules', '.bin', 'eslint');
  console.log(`Linting Created File...`);
  exec(`${eslintFolder} ./src --ext ts --fix`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`Completed`);
  });
})();
