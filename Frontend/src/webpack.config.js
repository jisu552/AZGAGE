module.exports = {
    // 다른 webpack 설정
  
    resolve: {
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        // 추가적으로 필요한 다른 Node.js 코어 모듈의 폴리필 설정
        // 예: "stream": require.resolve("stream-browserify"),
      },
    },
  
    // 다른 webpack 설정
  };
  