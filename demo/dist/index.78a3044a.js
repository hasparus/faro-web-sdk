function throwError(){throw new Error("This is a thrown error")}function callUndefined(){eval("test();")}function callConsole(e){console[e](`This is a console ${e} message`)}function fetchError(){fetch("http://localhost:12345",{method:"POST"})}function promiseReject(){new Promise(((e,t)=>{t("This is a rejected promise")}))}function fetchSuccess(){fetch("http://localhost:1234")}function sendCustomMetric(){window.grafanaJavaScriptAgent.api.pushMeasurement({type:"custom",values:{my_custom_metric:Math.random()}})}window.addEventListener("load",(()=>{window.grafanaJavaScriptAgent.api.pushLog(["Manual event from Home"])}));
//# sourceMappingURL=index.78a3044a.js.map