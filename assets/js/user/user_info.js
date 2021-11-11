$(function() {
    var form = layui.form;
    var layer = layui.layer;
    //  表单昵称自定义验证方法

    initUserInfo()
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
            }

        })
    }

    // 使用form.val方法快速为表单赋值
    form.val('formUserInfo', res.data)

    // 实现表单的重置效果
    // 阻止表单的默认重置行为，再重新获取用户信息即可：
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })


    // 发起请求更新用户的信息
    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serizlize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                //  window当前对象  .parent 父对象 的 getUserInfo()方法
                window.parent.getUserInfo();
                // 注意：`<iframe>` 中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可。
            }
        })

    })
})