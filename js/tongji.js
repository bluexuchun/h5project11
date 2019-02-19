let URL = location.href
let userId = getName(URL,'userid')

if(userId == undefined || userId == '' || userId == null || userId){
  userId = getStorageSync("chanel_userid")
}else{
  setStorageSync("chanel_userid",userId)
}

var _paq = _paq || [];
_paq.push(['setUserId', userId]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="//tongji.widiazine.cn/";
  _paq.push(['setTrackerUrl', u+'piwik.php']);
  _paq.push(['setSiteId', '21']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();
