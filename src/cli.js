import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--template': String,
      '--templatingEngine': String,
      '--packageManager': String,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-t': '--template',
      '-e': '--templatingEngine',
      '-p': '--packageManager',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    name: args._[0],
    skipPrompts: args['--yes'] || true,
    git: args['--git'],
    template: args.template,
    templatingEngine: args.templatingEngine,
    packageManager: args.packageManager,
    install: args['--install'],
  };
}

async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return {
      ...options,
      name: options.name || 'markup',
      git: true,
      template: 'JS',
      templatingEngine: 'Pug',
      packageManager: 'npm',
      install: true,
    };
  }

  const questions = [];

  if (!options.name) {
    questions.push({
      name: 'name',
      message: 'What is your project name?',
      default: 'markup',
    });
  }

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: [
        {
          name: 'JavaScript',
          value: 'JS',
        },
        {
          name: 'TypeScript',
          value: 'TS',
        },
      ],
    });
  }

  if (!options.templatingEngine) {
    questions.push({
      type: 'list',
      name: 'templatingEngine',
      message: 'Which templating engine would you like to use?',
      choices: ['Pug', 'HTML'],
    });
  }

  if (!options.packageManager) {
    questions.push({
      type: 'list',
      name: 'packageManager',
      message: 'What is your Package Manager?',
      choices: ['npm', 'yarn'],
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Would you like to use Git?',
    });
  }

  if (!options.install) {
    questions.push({
      type: 'confirm',
      name: 'install',
      message: 'Would you like to install packages?',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    ...answers,
  };
}

export async function cli(args) {
  let options = parseArgumentIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
