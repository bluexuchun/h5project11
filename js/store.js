/**
 * 做用户信息保存处理
 */
let store = (function(){
    /**
     * 获取到用户的姓名信息 并做水印处理
     * 如果没获取到 那么跳转至error
     */
    let setUserInfo = function(){
        let url = decodeURI(location.href);
        console.log(url)
        let name = getName(url,"userName");
        setStorageSync("chanel_userName",name)
        if(name == undefined || name == '' || name == null){
            getUserInfo()
        }else{
            watermake(name)
        };
    }
    /**
     * 读取用户信息
     */
    let getUserInfo = function(){
        let name = getStorageSync("chanel_userName")
        if(name == undefined || name == '' || name == null){
            location.href = 'error.html';
        }else{
            watermake(name)
        };
    }
    /**
     * 水印处理
     */
    let watermake = function(name){
        watermark({watermark_txt:name});
    }

    return {
        setUserInfo,
        getUserInfo
    }
})()