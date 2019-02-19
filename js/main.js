let main = (function(){
  let init = function(){
    // 读取用户进度
    let progress = getStorageSync("progress") || []
    if(is.not.empty(progress)){
      progress = JSON.parse(progress)
    }
    progress.map((v,i) => {
      $('.square-box').eq(v-1).attr('data-islearn',true)
      $('.square-box').eq(v-1).find('.square-shadow').hide()
    })
  }
  // 判断依次顺序
  let isOrder = function(obj){
    let _this = $(obj).parent()
    let id = _this.attr('data-id')
    let target = _this.find('.square-shadow')
    if(id == 1){
      learn(_this,target,id)
    }else{
      let key = true
      for (let index = 0; index < id - 1; index++) {
        let islearn = $('.square-box').eq(index).attr('data-islearn')
        if(islearn == "nolearn"){
          key = false
        }
      }
      if(key){
        learn(_this,target,id)
      }else{
        showModel()
      }
    }
  }
  // 显示弹窗
  let showModel = function(){
    $('.square-model').css({
      display:'flex'
    })
  }
  // 隐藏弹窗
  let hideModel = function(){
    $('.square-model').css({
      display:'none'
    })
  }
  // 学习并跳转
  let learn = function(parent,obj,type){
    // 保存用户点击的typeid
    setStorageSync("typeid",type)
    
    location.href = './detail.html'
  }

  return {
    init,
    isOrder,
    hideModel
  }
})()