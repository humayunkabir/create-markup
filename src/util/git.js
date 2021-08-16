import execa from 'execa';

export default async function initGit(dir) {
  const result = await execa('git', ['init', dir]);
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
}
