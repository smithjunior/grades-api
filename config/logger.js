import winston from 'winston'
const { combine, timestamp, label, printf } = winston.format

const createLogger = (labelName = 'desafio-api', filename = 'storage/logs/desafio-api.log') => {
  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
  })

  return winston.createLogger({
    level: 'silly',
    transports: [
      new (winston.transports.Console)(),
      new winston.transports.MongoDB({
        level: 'info',
        db: process.env.MONGODB,
        collection: 'logs_grades',
        capped: true,
        cappedMax: 20,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      }),
      new (winston.transports.File)({ filename: filename })
    ],
    format: combine(
      label({ label: labelName }),
      timestamp(),
      myFormat
    )
  })
}
export default createLogger
