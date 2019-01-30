"ui";

ui.layout(
    <vertical padding="16">
  
    <button id="ok" text="Get请求"
h="60" style="Widget.AppCompat.Button.Colored"/>
    <input id="my" hint="请求结果"/>
      <webview id="show_pic" />
    </vertical>
);

ui.ok.click(function() {
//开启新线程
threads.start(httpGet);

});
//新建一个emitter, 并指定回调执行的线程为当前线程
var getEmitter = events.emitter(threads.currentThread());

var url = "http://guolin.tech/api/bing_pic";

var httpGet = function() {
        var res = http.get(url);
    if (res.statusCode == 200) {
        toast("请求成功");
        var resultStr = res.body.string();
        getEmitter.emit('result', resultStr);
    } else {
        toast("请求失败:" + res.statusMessage);
    }
}

getEmitter.on('result', function(resultStr) {
    ui.my.setText(resultStr);
    ui.show_pic.loadUrl(resultStr);
});