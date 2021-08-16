const getDependencies = (options) => {
  switch (options.cssFramework) {
    case 'Bootstrap':
      return {
        bootstrap: '5.1.0',
      };
  }
};

export default getDependencies;
