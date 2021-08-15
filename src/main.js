import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import installPackages from './install-packages';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles({ source, target }) {
  return await copy(source, target, {
    clobber: true,
  });
}

async function initGit(options) {
  const result = await execa('git', ['init', options.targetDir]);
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
}

export async function createProject(options) {
  console.log(chalk.green(`Creating project ${options.name}`));
  options = {
    ...options,
    targetDir: options.targetDir || process.cwd() + '/' + options.name,
  };

  const currentFileUrl = import.meta.url;
  const sourceDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates'
  );

  options.sourceDir = sourceDir;

  // options.sourceDirs = [
  //   {
  //     source: `${sourceDir}/src/${options.templatingEngine.toLowerCase()}`,
  //     target: options.targetDir + '/src',
  //   },
  //   {
  //     source: `${sourceDir}/src/assets/${options.template.toLowerCase()}`,
  //     target: options.targetDir + '/src/assets',
  //   },
  //   {
  //     source: `${sourceDir}/src/assets/css`,
  //     target: options.targetDir + '/src/assets',
  //   },
  //   {
  //     source: `${sourceDir}/src/assets/font`,
  //     target: options.targetDir + '/src/assets',
  //   },
  //   {
  //     source: `${sourceDir}/src/assets/img`,
  //     target: options.targetDir + '/src/assets',
  //   },
  //   {
  //     source: `${sourceDir}/src/assets/scss`,
  //     target: options.targetDir + '/src/assets',
  //   },
  //   {
  //     source: `${sourceDir}/src/assets/video`,
  //     target: options.targetDir + '/src/assets',
  //   },
  // ];

  try {
    await access(sourceDir, fs.constants.R_OK);
    // options.sourceDirs.forEach(async (dir) => {
    //   await access(dir.source, fs.constants.R_OK);
    // });
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  let stdout = 'Happy Coding!';

  const tasks = new Listr([
    {
      title: 'Copying template files',
      task: async () => {
        await copyTemplateFiles({
          source: options.sourceDir,
          target: options.targetDir,
        });
        // options.sourceDirs.forEach(async (options) => {
        //   await copyTemplateFiles(options);
        // });
      },
    },
    {
      title: 'Initializing Git',
      task: async () => await initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Installing dependencies',
      task: async () => {
        stdout = await installPackages(
          {
            bootstrap: '5.1.0',
          },
          options
        );
      },
      skip: () =>
        !options.install
          ? 'Pass --install to automatically install dependencies'
          : undefined,
      enabled: () => options.install,
    },
  ]);

  await tasks.run();
  console.log(stdout);

  console.log('%s Markup Ready', chalk.green.bold('DONE'));

  console.log(chalk.yellow.bold(`\ncd ${options.name}\n`)); // && ${options.packageManager} start

  return true;
}
