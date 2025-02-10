/* eslint-disable @typescript-eslint/no-unused-vars */
import { errorHandler } from 'lib/error-handler'
import { CODE, RESPONSE } from 'lib/constant'

const TAG_FORMAT = (tag: string) => `[${tag}]`
const TAG_DEFAULT = 'NO_TAG'

class AppLogger {
  private static instance: AppLogger
  private constructor() {}

  static getInstance() {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger()
    }
    return AppLogger.instance
  }

  public error(errorRaw: AppError, tag: string = TAG_DEFAULT, target: string = 'NO_TRACE', content: string) {
    const stack = errorRaw instanceof Error ? errorRaw.stack : new Error().stack
    let lineInfo = ''
    if (stack) {
      const stackLines = stack.split('\n')
      if (stackLines.length > 1) {
        lineInfo = stackLines[1].trim()
      }
    }
    const targetLineInfo = `${target} @ ${lineInfo}`
    console.error(`ERROR: ${errorRaw}`, `TAG: ${TAG_FORMAT(tag)}`, targetLineInfo, content)
  }

  public response(message: string, code?: CODE, tag: string = TAG_DEFAULT, redirectTo?: string, data?: unknown) {
    return RESPONSE.SUCCESS(message, code, redirectTo, data)
  }

  public errorResponse(error: AppError | string, code: CODE, tag: string = TAG_DEFAULT, redirectTo?: string, data?: unknown) {
    return RESPONSE.ERROR(errorHandler(error as AppError), code, redirectTo, data)
  }

  public errorMessage(message: string, code: CODE, tag: string = TAG_DEFAULT) {
    return RESPONSE.ERROR(message, code)
  }

  public info(content: string, tag: string = TAG_DEFAULT) {
    console.info(TAG_FORMAT(tag), content)
  }

  public log(content: string, tag: string = TAG_DEFAULT) {
    console.log(TAG_FORMAT(tag), content)
  }
}

export const SystemLogger = AppLogger.getInstance()
