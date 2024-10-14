import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const showEOL = () => {
  console.log(`Default system End-Of-Line (EOL) is: ${JSON.stringify(EOL)}`);
};
