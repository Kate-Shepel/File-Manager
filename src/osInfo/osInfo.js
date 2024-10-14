import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const showEOL = () => {
  console.log(`Default system End-Of-Line (EOL) is: ${JSON.stringify(EOL)}`);
};

export const showCPUInfo = () => {
  const cpuData = cpus();
  const cpusNumber = cpuData.length;

  console.log(`Number of CPUs: ${cpusNumber}`);

  cpuData.forEach((cpu, index) => {
    const { model, speed } = cpu;
    console.log(`CPU ${index + 1}: ${model}, ${speed / 1000} GHz`);
  });
};