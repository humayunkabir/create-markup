import ncp from 'ncp';
import { promisify } from 'util';
const copy = promisify(ncp);

export default async function copyTemplateFiles({ source, target }) {
  return await copy(source, target, {
    clobber: true,
  });
}
