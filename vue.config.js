module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "pluginOptions": {
    "electronBuilder": {
      "builderOptions": {
        "appId": "com.maxzeroedge.aws_api_console",
        "productName": "AWS API Console",
        "win": {
          "target": [
            {
              "target": "nsis",
              "arch": [
                "x64",
                "ia32"
              ]
            }, 
            {
              "target": "portable",
              "arch": [
                "x64",
                "ia32"
              ]
            }
          ]
        },
        "linux": {
          "target": [
            {
              "target": "deb",
              "arch": [
                "x64",
                "ia32"
              ]
            },
            {
              "target": "AppImage",
              "arch": [
                "x64",
                "ia32"
              ]
            }
          ]
        }
      }
    }
  }
}