// 查找需要的内容
function getName(url,name){
  var getValue;
  if(url.includes('?')){
    var urlArray = url.split('?');
    var deArray = urlArray[1].split('&');
    for(var i=0;i<deArray.length;i++){
      var getName = deArray[i].split('=');
      if(getName[0] == name){
        getValue = getName[1];
        break;
      }else{
        return false;
      }
    }
    return getValue;
  }else{
    return false;
  }
  
}

// 设置缓存
function setStorageSync(key,value){
   window.localStorage.setItem(key,value)
}

// 读取缓存
function getStorageSync(key){
   return window.localStorage.getItem(key) || false
}

// 数组去重
function uniq(array){
  var temp = []; //一个新的临时数组
  for(var i = 0; i < array.length; i++){
      if(temp.indexOf(array[i]) == -1){
          temp.push(array[i]);
      }
  }
  return temp;
}