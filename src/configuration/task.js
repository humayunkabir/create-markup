import installPackages from '../util/install';
import copyTemplateFiles from '../util/copy';
import initGit from '../util/git';

const getTaskList = (options) => [
  {
    title: 'Copying project files',
    task: async () => {
      await copyTemplateFiles({
        source: `${options.sourceDir}/project`,
        target: options.targetDir,
      });
    },
  },
  {
    title: 'Copying script files',
    task: async () => {
      await copyTemplateFiles({
        source: `${options.sourceDir}/script/${options.script.toLowerCase()}`,
        target: `${options.targetDir}/src/${options.script.toLowerCase()}`,
      });
    },
  },
  {
    title: 'Copying style files',
    task: async () => {
      await copyTemplateFiles({
        source: `${options.sourceDir}/style/${options.style.toLowerCase()}`,
        target: `${options.targetDir}/src/${options.style.toLowerCase()}`,
      });
    },
  },
  {
    title: 'Copying template files',
    task: async () => {
      await copyTemplateFiles({
        source: `${
          options.sourceDir
        }/template-engine/${options.templatingEngine.toLowerCase()}`,
        target: `${options.targetDir}/src`,
      });
    },
  },
  {
    title: 'Copying bundler files',
    task: async () => {
      await copyTemplateFiles({
        source: `${
          options.sourceDir
        }/bundlers/${options.bundler.toLowerCase()}`,
        target: options.targetDir,
      });
    },
  },
  {
    title: 'Initializing Git',
    task: async () => await initGit(options.targetDir),
    enabled: () => options.git,
  },
  {
    title: 'Installing dependencies',
    task: async () => await installPackages(options),
    skip: () =>
      !options.install
        ? 'Pass --install to automatically install dependencies'
        : undefined,
    enabled: () => options.install,
  },
];

export default getTaskList;
