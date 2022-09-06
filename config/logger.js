const config = {
    appenders:{
      miLoggerConsole:{ type: 'console'},
      miLoggerFile2:{ type: 'file',filename: './logs/error.log'}
    },
    categories:{
      default:{ appenders: ['miLoggerConsole'], level:'all'},
      error:  { appenders: ['miLoggerFile2', 'miLoggerConsole'], level:'error'}
    }
  }

module.exports = config