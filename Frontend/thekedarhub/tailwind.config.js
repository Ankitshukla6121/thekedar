module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Include all Angular files
    "./node_modules/flowbite/**/*.js"  // Include Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")  // Add Flowbite plugin
  ],
};
