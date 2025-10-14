const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    transpileDependencies: true,
    // devServer: {
    //     proxy: {
    //         "/api": {
    //             target: "http://localhost:8000", // backend URL mo
    //             changeOrigin: true,
    //             pathRewrite: { "^/api": "" },
    //         },
    //     },
    // },
});
