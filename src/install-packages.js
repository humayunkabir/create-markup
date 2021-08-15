import fs from 'fs';
import { install, projectInstall } from 'pkg-install';

const installPackages = async (packages, options) => {
  fs.writeFileSync(
    `${options.targetDir}/package.json`,
    JSON.stringify(
      {
        name: options.name,
        version: '0.1.0',
        description: 'Powered by create-markup',
        main: 'index.js',
        scripts: {
          test: 'echo "Error: no test specified" && exit 1',
        },
        keywords: ['create-markup', 'cli'],
      },
      null,
      2
    )
  );

  const { stdout } = await install(packages, {
    dev: false,
    cwd: options.targetDir,
    prefer: 'npm' || options.packageManager,
    ...options,
  });

  return stdout;
};

export default installPackages;
