const log4js = require('log4js')
const config = require('../config')

//配置
log4js.configure({
    appenders : {
        console: {
            type: 'console'
        },
        files  : {
            type                : 'dateFile',
            filename            : config.log_path,
            pattern             : config.log_pattern,
            alwaysIncludePattern: true,
        }
    },
    categories: {
        default: {
            appenders: ['console', 'files'],
            level    : config.log_level
        },
    }
})

module.exports = log4js.getLogger()