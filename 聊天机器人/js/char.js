$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    // 底部消息编辑区域

    $(".footer .input_txt").on("keyup", function(e) {
        console.log(e);
        if (e.keyCode === 13) {
            $(".footer .input_sub").click();
        }
    })

    // 绑定发送按钮事件

    $(".footer .input_sub").click(function() {
        var text = $(".footer .input_txt").val().trim();
        if (text.length === 0) {
            $(".footer .input_txt").val("");
            return false;
        } else {
            var li = $("<li class='right_word'><img src='img/person02.png'/><span>" + text + "</span></li>");
            $(".talk_list").append(li);
            $(".footer .input_txt").val("");

            // 自动滑倒底部
            resetui();

            // 机器人回复

            // 获取文字
            $.ajax({
                method: "GET",
                url: "http://www.liulongbin.top:3006/api/robot",
                data: {
                    spoken: text,
                },

                success: function(res) {
                    // 判断是否返回成功
                    if (res.message === "success") {
                        var reText = res.data.info.text;
                        // console.log(reText);
                        var li = $('<li class="left_word"><img src="img/person01.png" /> <span>' + reText + '</span></li>');
                        $(".talk_list").append(li);
                        resetui();
                        getVoice(reText);
                    }


                }
            })

            // 获取语音信息
            function getVoice(reText) {
                $.ajax({
                    method: "GET",
                    url: "http://www.liulongbin.top:3006/api/synthesize",
                    data: {
                        text: reText,
                    },

                    success: function(res) {
                        if (res.status === 200) {
                            $(".voice").attr("src", res.voiceUrl);
                            // console.log(res);
                        }
                    }
                })
            }


        }
    })




    // 底部消息编辑区域

})