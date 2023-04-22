module.exports = {

    // 检测网址超时时间(毫秒)
    timeout: 3000,
    // 日志配置
    log_level  : 'debug',
    log_path   : './logs/all',
    log_pattern: 'yyyy-MM-dd.log',

    // 检测列表
    check_list: [
        'https://baidu.com',
        'https://www.google.com',
    ],

    // 错误预警
    warning: {
        // 尝试次数
        try_count: 3,
    },

    // 邮箱通知配置
    email_config: {
        from: {
            user: '111@qq.com',
            pass: '123456',
        },
        to  : {
            user: '222@qq.com',
        }
    },

}