let colorGroup = (function(){
    // 初始化
    let init = function(){
        // 清楚所有缓存
        // window.localStorage.clear()
        let coloritems = [
            {
                icon:'img/colorAry/52.png',
                name:'#52 随性（限量） ',
                color:'#fca889'
            },{
                icon:'img/colorAry/53.png',
                name:'#53 时髦',
                color:'#d98268'
            },{
                icon:'img/colorAry/56.png',
                name:'#56 瞬间',
                color:'#f5a787'
            },{
                icon:'img/colorAry/97.png',
                name:'#97 热情',
                color:'#ed254e'
            },{
                icon:'img/colorAry/60.png',
                name:'#60 节拍',
                color:'#ed3a31'
            },{
                icon:'img/colorAry/62.png',
                name:'#62 火焰',
                color:'#ed3b29'
            },{
                icon:'img/colorAry/64.png',
                name:'#64 热烈 (限量)',
                color:'#e0124e'
            },{
                icon:'img/colorAry/66.png',
                name:'#66 脉动',
                color:'#ec3639'
            },{
                icon:'img/colorAry/68.png',
                name:'#68 终极',
                color:'#e72536'
            },{
                icon:'img/colorAry/70.png',
                name:'#70 态度',
                color:'#8c0e2a'
            },{
                icon:'img/colorAry/54.png',
                name:'#54 男孩',
                color:'#cf8c7c'
            },{
                icon:'img/colorAry/90.png',
                name:'#90 日间',
                color:'#f07071'
            },{
                icon:'img/colorAry/72.png',
                name:'#72 急促',
                color:'#f06f70'
            },{
                icon:'img/colorAry/74.png',
                name:'#74 闪光',
                color:'#f06562'
            },{
                icon:'img/colorAry/76.png',
                name:'#76 热忱',
                color:'#ee5964'
            },{
                icon:'img/colorAry/78.png',
                name:'#78 情感',
                color:'#ec3552'
            },{
                icon:'img/colorAry/91.png',
                name:'#91 波西米亚',
                color:'#ed2b53'
            },{
                icon:'img/colorAry/82.png',
                name:'#82 生活',
                color:'#c84b58'
            },{
                icon:'img/colorAry/84.png',
                name:'#84 即刻',
                color:'#f28479'
            },{
                icon:'img/colorAry/86.png',
                name:'#86 隐秘 ',
                color:'#ee4461'
            },{
                icon:'img/colorAry/92.png',
                name:'#92 挚爱',
                color:'#cb2437'
            },{
                icon:'img/colorAry/94.png',
                name:'#94 渴望',
                color:'#bd1c5a'
            },{
                icon:'img/colorAry/96.png',
                name:'#96 现象',
                color:'#7c1f3d'
            },{
                icon:'img/colorAry/98.png',
                name:'#98 直觉',
                color:'#c31b3e'
            },{
                icon:'img/colorAry/102.png',
                name:'#102 摩登黑（限量）',
                color:'#6d202a'
            },{
                icon:'img/colorAry/104.png',
                name:'#104 性情（限量）',
                color:'#6e1f34'
            },{
                icon:'img/colorAry/106.png',
                name:'#106 征服',
                color:'#80272c'
            },{
                icon:'img/colorAry/72.png',
                name:'#72 急促',
                color:'#f06f70'
            },{
                icon:'img/colorAry/74.png',
                name:'#74 闪光',
                color:'#f06562'
            },{
                icon:'img/colorAry/98.png',
                name:'#98 直觉',
                color:'#c31b3e'
            }
        ]
        return coloritems
    }
    // 选择颜色
    let chooseColor = function(obj){
        let name = $(obj).attr('data-name')
        let color = $(obj).attr('data-color')
        theme = color
        setStorageSync("theme",theme)
        $('.tips-color').empty().html(name)
        changeTheme()
    }
    // 改变主题
    let changeTheme = function(){
        $('.main').css({
            'background':theme
        })
        $('.model-box').css({
            'background':theme
        })
        $('.btnAction-active').css({
            'background':theme
        })
    }
    // 隐藏弹窗
    let hideModel = function(obj){
        let _this = $(obj).parent()
        _this.hide()
    }
    // 显示弹窗
    let showModel = function(key,obj){
        $(obj).addClass('btnAction-active').css({
            background:theme
        })
        $(obj).siblings().removeClass('btnAction-active').css({
            background:'#DCDCDC'
        })
        $('.model').css({
            display:'flex'
        })
    }
    // 跳转页面
    let linkTo = function(url){
        location.href = url
    }
    // 隐藏提示
    let hidebg = function(){
        $('.touchbg').hide()
    }
    return {
        init,
        chooseColor,
        changeTheme,
        hideModel,
        showModel,
        linkTo,
        hidebg
    }
})()