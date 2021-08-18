export const questions = [
  {
    type: 'list',
    name: 'skipPrompts',
    message: 'Setup:',
    choices: [
      {
        name: 'Default',
        value: true,
      },
      {
        name: 'Custom',
        value: false,
      },
    ],
  },
  {
    name: 'name',
    message: 'What is your project name?',
    default: 'markup',
  },
  {
    type: 'list',
    name: 'script',
    message: 'Which template would you like to use?',
    choices: [
      {
        name: 'JavaScript',
        value: 'JS',
      },
    ],
  },
  {
    type: 'list',
    name: 'templatingEngine',
    message: 'Which templating engine would you like to use?',
    choices: ['Pug'],
  },
  {
    type: 'list',
    name: 'bundler',
    message: 'Which bundler would you like to use?',
    choices: ['Gulp'],
  },
  {
    type: 'list',
    name: 'cssFramework',
    message: 'Which CSS framework would you like to use?',
    choices: ['Bootstrap'],
  },
  {
    type: 'list',
    name: 'style',
    message: 'Which CSS preprocessor would you like to use?',
    choices: ['CSS', 'SCSS'],
  },
  {
    type: 'list',
    name: 'packageManager',
    message: 'What is your Package Manager?',
    choices: ['npm'],
  },
  {
    type: 'confirm',
    name: 'git',
    message: 'Would you like to use Git?',
  },
  {
    type: 'confirm',
    name: 'install',
    message: 'Would you like to install packages?',
  },
];

const getQuestion = (name) =>
  questions.find((question) => question.name === name);

export default getQuestion;
