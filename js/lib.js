(function(){
	var lib = {
		api:{
			token:'7162a3ab2cd66189ac846f80b7dad881',
			url:'http://api.pugu.biz/index.php?g=CookbookOrder&m=Api'
		},
		init:function(){
			mui('.mui-content,nav').on('tap', 'a', function() {
				var id = this.getAttribute('href');
				var href = this.href;
				var type = this.getAttribute("open-type");
				if(id != '#' && type == 'open'){
					mui.openWindow({
						id: id,
						url: this.href,
						styles: {popGesture: 'close'},
						show: {
							aniShow: 'pop-in'
						},
						waiting: {
							autoShow: false
						}
					});
				}
			});
		},
		index:function(){
			lib.get('diningtable',function(res){
				res = JSON.parse(res);
				if(res.name){
					mui('h1.mui-title')[0].innerHTML = res.name;
					mui.init({
						swipeBack: false,
						statusBarBackground: '#f7f7f7',
						gestureConfig: {
							doubletap: true
						},
						subpages: [{
							id: 'module',
							url: './html/module.html',
							styles: {
								top: '45px',
								bottom: 0,
								bounce: 'vertical'
							},
							extras: {
								arguments:{
									id:1
								}
							}
						}]
					});
				}
			});
		},
		module:function(){
			
		},
		cate:function(){
			var a = lib.cache.get('category'),b = function(res){
				var i = mui('#cate'),l = mui('#items');
				res = JSON.parse(res),i[0].innerHTML = juicer(l[0].innerHTML,res),lib.cache.set('category',res);
			};
			a ? b(a) : lib.get('category',b);
		},
		dish:function(){
//			var header = document.getElementById("header");
//			var ri = document.createElement('a');
//			ri.className = 'mui-icon mui-icon-plus mui-pull-right';
//			header.appendChild(ri);
		},
		cart:function(){
			mui('nav').on('tap', 'a', function(e) {
				var b = e.target,id = b.getAttribute('href'),href = b.href;
				mui.alert("共2张小票打印完成",'打印小票','确认',function(){
					var h = plus.webview.getLaunchWebview();
					plus.webview.show(h);
				});
			});
		},
		cache:{
			get:function(key){
				return plus.storage.getItem(key);
			},
			set:function(key,value){
				plus.storage.setItem(key, value);
			},
			remove:function(key){
				plus.storage.removeItem(key);
			}
		},
		get:function(cf,callback){
			lib.ajax(lib.url(cf),function(res){
				callback && callback(res);
			})
		},
		post:function(cf,callback,data){
			lib.ajax(lib.url(cf),function(res){
				callback && callback(res);
			},data);
		},
		url:function(cf){
			return lib.api.url + '&a=' + cf + '&token=' + lib.api.token;
		},
		ajax:function(url,callback,data){
			var xhr = new plus.net.XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if(xhr.readyState == 4){
					callback && callback(xhr.responseText);
				}
			}
			xhr.onerror = function(e){
				console.log(JSON.stringify(e));
			}
			xhr.open(data ? 'POST' : 'GET', url);
			data ? xhr.send(JSON.stringify(data)) : xhr.send();
		}
	}
	/**
	 * 兼容 AMD 模块
	 **/
	if (typeof define === 'function' && define.amd) {
		define('lib', [], function() {
			return lib;
		});
	}
})();