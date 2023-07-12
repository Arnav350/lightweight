const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      sourceExts: sourceExts,
    },
    server: {
      rewriteRequestUrl: (url) => {
        if (!url.endsWith(".bundle")) {
          return url;
        }
        // https://github.com/facebook/react-native/issues/36794
        // JavaScriptCore strips query strings, so try to re-add them with a best guess.
        return url + "?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true";
      }, // ...
    }, // ...
  };
})();
