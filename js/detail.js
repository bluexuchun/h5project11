let detail = (function(){
    const typeid = getStorageSync("typeid")
    // 记录九宫格的数据（短暂记录）
    let squareList = []
    // 初始化
    let init = function(){
        initTheme()
        clearContent()
        showContent(typeid)
    }
    // 展现对应的分类内容
    let showContent = function(typeid){
        if(typeid == 1){
            $('.content-type1').show()
            showIcon()
            changeProgress(1,1)
        }else if(typeid == 2){
            $('.type2').show()
            $('.main').css({
                height:'100vh',
                'padding-bottom':'0px'
            })
            changeProgress(1,3)
        }else if(typeid == 3){
            $('.content-type3').show()
            showIcon()
            changeProgress(1,1)
        }else if(typeid == 4){
            $('.content-type4').show()
            showIcon()
            changeProgress(1,1)
        }else if(typeid == 5){
            initChoose()
            $('.content-type5').show()
            showIcon()
            $('.progress').css({
                display:'none'
            })
            $('.icon-down').css({
                bottom:'2rem'
            })
            $('.main').css({
                'padding-bottom':'0px'
            })
            $('.icond').css({
                'margin-top':'0.75rem'
            })
            let progress = getStorageSync("progress") || []
            if(!is.array(progress)){
                progress = JSON.parse(progress)
            }
            progress.push(typeid)
            progress = uniq(progress)
            progress = progress.sort()
            setStorageSync("progress",JSON.stringify(progress))
        }
    }
    /**
     * 改变底部的进度条
     * @param {当前进度} activeIndex 
     * @param {总共进度} allIndex 
     */
    let changeProgress = function(activeIndex,allIndex){
        // 如果相等 显示完成按钮
        let content = activeIndex + '/' + allIndex
        if(activeIndex == allIndex){
            $('.icon-right').hide()
            $('.icon-quit').show()
        }else{
            $('.icon-right').show()
            $('.icon-quit').hide()
        }
        let percent = (activeIndex / allIndex).toFixed(1) * 100
        $('.line-acture').css({
            width:percent + '%'
        })
        $('.progress-text').empty().html(content)
    }
    // swiper toNext
    let stoNext = function(){
        if(typeid == 2){
            if(squareList.length == 8){
                swiper.slideNext()
                changeProgress(swiper.activeIndex + 1,swiper.slides.length)
            }else{
                showModel2()
            }
        }else{
            swiper.slideNext()
            changeProgress(swiper.activeIndex + 1,swiper.slides.length)
        }
    }
    // swiper toPrev
    let stoPrev = function(){
        swiper.slidePrev()
        changeProgress(swiper.activeIndex + 1,swiper.slides.length)
    }
    // 显示icon-down
    let showIcon = function(){
        $('.icon-down').css({
            opacity:1
        })
    }
    // 隐藏icon-down
    let hideIcon = function(){
        $('.icon-down').css({
            opacity:0
        })
    }
    // 完成学习
    let finishCourse = function(){
        let progress = getStorageSync("progress") || []
        if(!is.array(progress)){
            progress = JSON.parse(progress)
        }
        progress.push(typeid)
        progress = uniq(progress)
        progress = progress.sort()
        setStorageSync("progress",JSON.stringify(progress))
        location.href = './main.html'
    }

    // 初始化用户的勾选进度
    let initChoose = function(){
        let cprogress = getStorageSync("cprogress") || []
        if(is.not.empty(cprogress)){
            cprogress = JSON.parse(cprogress)
        }
        cprogress.map((v,i) => {
            $('.choose-item').eq(v-1).attr('data-choose',true)
            $('.choose-item').eq(v-1).css({
                opacity:1
            })
        })
    }
    // 获取主题
    let initTheme = function(){
        theme = getStorageSync("theme")
        changeTheme()
    }

    // 清楚内容
    let clearContent = function(){
        $('.content-type1').hide()
        $('.type2').hide()
        $('.content-type3').hide()
        $('.content-type4').hide()
        $('.content-type5').hide()
    }

    // 获取九宫格的内容
    let initSquare = function(){
        let squareList = [
            {
                id:1,
                icon:'./img/content/upgrade/1.png',
                content:'./img/content/upgrade/1~1.png'
            },{
                id:2,
                icon:'./img/content/upgrade/2.png',
                content:'./img/content/upgrade/2~1.png'
            },{
                id:3,
                icon:'./img/content/upgrade/3.png',
                content:'./img/content/upgrade/3~1.png'
            },{
                id:4,
                icon:'./img/content/upgrade/4.png',
                content:'./img/content/upgrade/4~1.png'
            },{
                icon:'./img/content/upgrade/5.png',
                content:false
            },{
                id:5,
                icon:'./img/content/upgrade/6.png',
                content:'./img/content/upgrade/6~1.png'
            },{
                id:6,
                icon:'./img/content/upgrade/7.png',
                content:'./img/content/upgrade/7~1.png'
            },{
                id:7,
                icon:'./img/content/upgrade/8.png',
                content:'./img/content/upgrade/8~1.png'
            },{
                id:8,
                icon:'./img/content/upgrade/9.png',
                content:'./img/content/upgrade/9~1.png'
            }
        ]
        return squareList
    }
    // 改变主题颜色
    let changeTheme = function(){
        $('.main').css({
            background:theme
        })
    }

    // 显示细节
    let showDetail = function(obj){
        let _this = $(obj)
        let imgsrc = _this.attr('data-content')
        let id = Number(_this.attr('data-id'))
        if(imgsrc != "false"){
            $('.content-model').append('<img class="model-img" src="'+imgsrc+'" />').show()
        }
        // 并且记录数据
        if(is.number(id)){
            squareList.push(id)
            squareList = uniq(squareList)
            squareList = squareList.sort()

        }
    }

    // 隐藏细节
    let hideDetail = function(){
        $('.content-model').hide().empty()
    }

    // 勾选
    let chooseGou = function(obj){
        let _this = $(obj)
        let id = _this.attr('data-id')
        if(id == 1){
            showGou(_this,id)
        }else{
            let key = true
            for (let index = 0; index < id - 1; index++) {
                let ischoose = $('.choose-item').eq(index).attr('data-choose')
                if(ischoose == "nochoose"){
                    key = false
                }
            }
            if(key){
                showGou(_this,id)
            }else{
                showModel()
            }
        }
    }

    // 执行勾选后的操作
    let showGou = function(obj,id){
        let cprogress = getStorageSync("cprogress") || []
        if(!is.array(cprogress)){
            cprogress = JSON.parse(cprogress)
        }
        cprogress.push(id)
        cprogress = uniq(cprogress)
        cprogress = cprogress.sort()

        setStorageSync("cprogress",JSON.stringify(cprogress))

        obj.attr('data-choose',true)
        obj.css({
            opacity:1
        })
    }
    let showModel = function(){
        $('.model').css({
            display:'flex'
        })
    }
    let hideModel = function(){
        $('.model').css({
            display:'none'
        })
    }
    let showModel2 = function(){
        $('.model2').css({
            display:'flex'
        })
    }
    let hideModel2 = function(){
        $('.model2').css({
            display:'none'
        })
    }
    let showModel3 = function(){
        $('.model3').css({
            display:'flex'
        })
    }
    let hideModel3 = function(){
        $('.model3').css({
            display:'none'
        })
    }
    // 检测勾选状态是否全部勾选
    let startTest = function(){
        let cprogress = getStorageSync("cprogress") || []
        if(!is.array(cprogress)){
            cprogress = JSON.parse(cprogress)
        }
        cprogress = uniq(cprogress)
        if(cprogress.length == 4){
            showModel3()
        }else{
            showModel()
        }
    }
    let linkToTest = function(){
        location.href = './test.html'
    }

    return {
        init,
        initSquare,
        showDetail,
        hideDetail,
        hideModel,
        chooseGou,
        showIcon,
        hideIcon,
        finishCourse,
        changeProgress,
        stoNext,
        stoPrev,
        hideModel2,
        hideModel3,
        startTest,
        linkToTest
    }
})()