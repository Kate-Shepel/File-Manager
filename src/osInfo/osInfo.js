import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const showEOL = () => {
  console.log(`Default system End-Of-Line (EOL) is: ${JSON.stringify(EOL)}`);
};

export const showCPUInfo = () => {
  const cpuData = cpus();
  const cpusNumber = cpuData.length;

  console.log(`Number of CPUs: ${cpusNumber}`);

  cpuData.forEach((cpuItem, index) => {
    const { model, speed } = cpuItem;
    console.log(`CPU ${index + 1}: ${model}, ${speed / 1000} GHz`);
  });
};

export const showHomeDir = () => {
  console.log(`Home directory: ${homedir()}`);
};

export const showSystemUserName = () => {
  console.log(`System user name: ${userInfo().username}`);
};