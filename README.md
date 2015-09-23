# goobaiSuggestion
###使用jsonp,基于baidusug的谷歌百度搜索综合提示+自动完成工具</br>
###使用方法:
添加&lt;script type=&quot;text/javascript&quot; src=&quot;goobaisuggestion.min.js&quot;&gt;&lt;/script&gt;到body最后，在input标签加入goobaisug="2"
###</br>说明:</br>
1.系统会自动判断浏览器语言，如果为中文，先初始化百度，百度放在前面。否则先初始化谷歌，谷歌放在前面</br>2.可以通过键盘或者鼠标选择是结果提示引擎是谷歌还是百度</br>3.百度自动完成搜索提示jsonp请求格式为 "http://unionsug.baidu.com/su?wd=关键词&p=3&cb=回调函数"
，不支持https，若源网页为https,请求会被拦截;</br>4.Google自动完成搜索jsonp请求格式为"https://suggestqueries.google.com/complete/search?q=关键词&jsonp=回调函数&client=youtube" 注意必须加上client=youtube，这是为youtube准备的，但提示是网页提示，并非视频提示。请求发自本地，故需要本地能正常访问Google，才能使用本插件</br>
###</br>Todo Lists:</br> 
1.服务器反代百度返回结果页面，或通过其他方法转发请求百度返回的结果。</br>2.对谷歌也进行类似处理，使其可以正常使用，并提供相关接口修改请求地址。</br>
###[在线Demo](http://rdpcdn.solidbox.info/goobaiSuggestion/goobaisuggestion_demo.html)  
### 截图</br>
![image](http://rdpcdn.solidbox.info/goobaiSuggestion/goobai1.png)
![image](http://rdpcdn.solidbox.info/goobaiSuggestion/goobai2.png)
