const processArgv = (knownArgs) => {
  const SEPARATOR = '=';
  const argsMap = {};
  const args = {};

  Object.keys(knownArgs).forEach((arg) => {
    knownArgs[arg].forEach((name) => {
      argsMap[name] = arg;
    });
  });

  process.argv.slice(2).forEach((arg) => {
    const [name, value] = arg.split(SEPARATOR);
    const key = argsMap[name] ? argsMap[name] : name;
    args[key] = value !== undefined ? value : true;
  });

  return args;
};

module.exports = { processArgv };
