let test = (function(){
    let answers = [{
        sid:0,
        sel:0
    }]
    let answer = []
    let key = false
    let allowAnswer = true
    let _init = function(){
        initTheme()
        requestList()
    }
    // 请求数据 加载题目列表
    let requestList = function(){
        let questionList = []
        $.ajax({
            type: 'POST',
            url: 'http://chanel.widiazine.cn/api.php?entry=sys&c=column&a=answer&do=display',
            data: {
              cid: 67
            },
            dataType: 'json',
            async: false,
            success: function(data) {
                if(data.status == 1){
                    let list = data.data
                    if(is.array(list)){
                        list.map((v,i) => {
                            let listitem = {
                                sid:v.sid,
                                title:v.title,
                                options:v.content
                            }
                            questionList.push(listitem)
                        })
                        makeAnswer(questionList)
                        changeProgress(1,questionList.length)
                    }
                }
            }
        })
    }
    // 生成题目
    let makeAnswer = function(questionList){
        if(is.array(questionList)){
            questionList.map((v,i) => {
                let rightnum = 0
                v.options.map((q,w) => {
                    console.log(q.judge)
                    if(q.judge != "" && is.not.empty(q.judge) && q.judge){
                        rightnum++
                    }
                })
                let html = '<div class="swiper-slide swiper-no-swiping">'+
                '<div class="content">'
                    if(rightnum == 1){
                        html += '<div class="content-title">'+(i + 1)+'. '+v.title+'<div class="content-type">单选题</div>'
                    }else{
                        html += '<div class="content-title">'+(i + 1)+'. '+v.title+'<div class="content-type">多选题</div>'
                    }
                    
                html += '</div>'+
                    '<div class="content-options" data-sid="'+v.sid+'" data-right="'+rightnum+'">';

                    if(is.array(v.options)){
                        v.options.map((j,k) => {
                            if(j.judge != "" && is.not.empty(j.judge) && j.judge){
                                html += '<div class="options-item" onclick="test.selectOption(this)" data-istrue="true" data-id="'+j.name+'">'+
                                    j.name
                                    +'<div class="answer">'+
                                        '<img class="icon-answer" src="./img/answer/true.png" alt="">'+
                                    '</div>'+
                                '</div>'
                            }else{
                                html += '<div class="options-item" onclick="test.selectOption(this)" data-istrue="false" data-id="'+j.name+'">'+
                                    j.name
                                    +'<div class="answer-wrong">'+
                                        '<img class="icon-answer" src="./img/answer/wrong.png" alt="">'+
                                    '</div>'+
                                '</div>'
                            }
                        })
                    }
                    html += '</div>'+
                    '</div>'+
                '</div>';
                swiper.appendSlide(html)
            })
        }
    }
    // 获取主题
    let initTheme = function(){
        theme = getStorageSync("theme")
        changeTheme()
    }
    // 改变主题颜色
    let changeTheme = function(){
        $('.main').css({
            background:theme
        })
    }
    // 选择选项
    let selectOption = function(obj){
        if(allowAnswer){
            let _this = $(obj)
            let _parent = _this.parent()
            // 选项得答案总数
            let optionsNum = Number(_parent.attr('data-right'))
            let id = _this.attr('data-id')
            let sid = _parent.attr('data-sid')


            if(optionsNum > answer.length){
                _this.css({
                    background:theme,
                    border:'1px solid transparent'
                })
            }

            answer.push(id)
            answer = uniq(answer)
            
            if(optionsNum == answer.length){
                allowAnswer = false
                key = true
                answers.push({
                    sid:sid,
                    sel:answer
                })
                let optionsAry = _parent.find('.options-item')
                optionsAry.map((v,i) => {
                    let istrue = $(i).attr('data-istrue')
                    if(istrue == 'true'){
                        $(i).css({
                            background:theme,
                            border:'1px solid transparent'
                        })
                    }else{
                        $(i).css({
                            background:'#eaeaea',
                            border:'1px solid transparent'
                        })
                    }
                    $(i).find('.icon-answer').css({
                        opacity:1
                    })
                })
            }
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
        if(key){
            swiper.slideNext()
            answer = []
            key = false
            allowAnswer = true
            changeProgress(swiper.activeIndex + 1,swiper.slides.length)
        }else{
            alert('请答题')
        }
    }
    // swiper toPrev
    let stoPrev = function(){
        // key = true
        // swiper.slidePrev()
        // changeProgress(swiper.activeIndex + 1,swiper.slides.length)
    }
    // 完成学习
    let finishCourse = function(){
        let userid = getStorageSync('chanel_userid')
        let userName = getStorageSync('chanel_userName')
        $.ajax({
            type: 'POST',
            url: 'http://chanel.widiazine.cn/api.php?entry=sys&c=column&a=answer&do=answer',
            data: {
              content: answers
            },
            dataType: 'json',
            async: false,
            success: function(res) {
                console.log(res)
                if(res.sum == 100){
                    $('.model-right').css({
                        display:'flex'
                    })
                }else{
                    $('.model-wrong').css({
                        display:'flex'
                    })
                    $('.wrong-num').empty().html(res.sum)
                }
                $.ajax({
                    type: 'GET',
                    url: 'http://wechanel.eweixin.biz/OutsideInterface/UpdateCoursePoint.asmx/UpdateUserCoursePoint?UserID=' + userid + '&CourseID=118&ChapterID=1&Point=' + res.sum,
                    dataType: 'json',
                    error: function(error) {
                      var text = error.responseText;
                      text = text.substring(text.indexOf('{') + 1, text.indexOf('}'));
                      var params = text.split(',');
                      var code = params[0].split(':')[1];
                      var message = params[1].split(':')[1];
                      if (code == 0) {
                        $.ajax({
                          type: 'POST',
                          url: 'http://chanel.widiazine.cn/api.php?entry=sys&c=column&a=answer&do=tongji',
                          data: {
                            userid: userid,
                            username: userName,
                            code: code,
                            message: message,
                            sum: res.sum,
                            courseid: 118,
                            content: answers
                          },
                          dataType: 'json',
                          success: function(result) {
                            console.log(result);
                          }
                        })
                      } else {
                        alert(message);
                      }
                    }
                  })
            }
        })
    }
    // 调查问卷
    let toquestion = function(){
        location.href = ''
    }
    // 重新答题
    let restart = function(){
        location.reload()
    }
    return {
        _init,
        selectOption,
        requestList,
        stoNext,
        stoPrev,
        finishCourse,
        toquestion,
        restart
    }
})()