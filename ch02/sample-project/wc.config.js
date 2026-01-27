export default {
  libraries: {
    "@awesome.me/webawesome": {
      /**
       * Fetch the Custom Elements Manifest file for Web Awesome from a URL.
       * This isn't needed if the @awesome.me/webawesome package is installed.
       * See https://github.com/wc-toolkit/wc-language-server/issues/27.
       */
      manifestSrc:
        "https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3.0.0-beta.4/dist/custom-elements.json",
    },
  },
};
