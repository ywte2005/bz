require.config({
    baseUrl: window.location.pathname.split('/www/')[0] + '/www/js',
    paths: { mui:'mui.min', juicer:'juicer', lib:'lib' },
    waitSeconds: 15
});
define(['mui','juicer','lib'],function(mui,juicer,lib){
	mui.plusReady(function(){
		var m = mui('script[data-main]')[0],module = m.baseURI;
		module = module.substr(module.lastIndexOf('/')+1).replace('.html','');
		lib.init();
		lib[module] && lib[module]();
	});
});