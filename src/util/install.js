import execa from 'execa';
import fs from 'fs';
import { projectInstall } from 'pkg-install';
import getBundler from '../configuration/bundler';
import getDependencies from '../configuration/dependencies';
import vendors from '../configuration/vendors';

const installPackages = async (options) => {
  const bundler = await getBundler(options.bundler.toLowerCase());
  const packageJson = JSON.stringify(
    {
      name: options.name,
      version: '0.1.0',
      description: 'Powered by create-markup',
      license: 'MIT',
      ...bundler,
      dependencies: getDependencies(options),
      keywords: ['create-markup', 'cli'],
      browserslist: ['last 5 version'],
    },
    null,
    2
  );

  fs.writeFileSync(`${options.targetDir}/package.json`, packageJson);

  if (options.bundler === 'Gulp') {
    fs.writeFileSync(
      `${options.targetDir}/vendors.json`,
      JSON.stringify(vendors, null, 2)
    );
  }

  const { stdout } = await projectInstall({
    prefer: options.packageManager,
    cwd: options.targetDir,
  });

  console.log(stdout);
};

export default installPackages;
