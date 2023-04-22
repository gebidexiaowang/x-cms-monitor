const config     = require('./config')
const axios      = require('axios')
const logger     = require('./utils/logger')
const nodemailer = require('nodemailer')

const check = async (url, curCount) => {

    logger.info(`第${curCount}次检测网址: ${url}`)

    let htmlObject
    try {
        htmlObject = await axios({ url, method: 'get', timeout: config.timeout })
        if ( !htmlObject ) throw new Error(`网址访问失败`)
    } catch ( e ) {
        logger.error(`访问失败, 错误原因: ${e.message}`)
        if ( curCount >= config.warning.try_count ) {
            return { code: 1, message: '网址访问失败' }
        } else {
            return await check(url, curCount + 1)
        }
    }
    return { code: 0, message: '网址访问成功' }
}

const emailNotify = async (url) => {
    let transporter = nodemailer.createTransport({
        host  : 'smtp.qq.com',
        port  : 465,
        secure: true,
        auth  : {
            user: config.email_config.from.user,
            pass: config.email_config.from.pass
        }
    })
    let sendContext = {
        from   : config.email_config.from.user,
        to     : config.email_config.to.user, // 接收者邮箱 可以是多个 以,号隔开
        subject: 'web预警',
        text   : `地址${url}出现问题了`
    }
    let ret         = await transporter.sendMail(sendContext)
    logger.info(`预警发送详情: ${ret.response}`)
}

const start = async () => {

    logger.info(`检测开始`)

    for ( let url of config.check_list ) {
        // 检测
        let ret = await check(url, 1)
        // 通知
        if ( ret.code !== 0 ) {
            await emailNotify(url)
            logger.info('发送预警通知, 检测结束')
            // 结束
            return
        } else {
            logger.info(`网址检测成功`)
        }
    }

    logger.info(`全部检测成功`)
}

start().then(r => {
})
