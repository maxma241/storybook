import path from 'path'
import fs from 'fs'
import arg from 'arg'
import { logger } from './utils'

import { start, build } from './index'

export const usage = 'nuxt storybook [`dev`|`build`] [`dir`]'

function _run () {
  const args = arg({})

  let [mode, _dir] = args._
  if (!_dir && fs.existsSync(mode)) {
    _dir = mode || '.'
    mode = 'dev'
  } else {
    _dir = _dir || '.'
    mode = mode || 'dev'
  }
  // Resolve dir
  const rootDir = path.resolve(process.cwd(), _dir)

  switch (mode) {
    case 'build':
      return build({
        rootDir,
        mode
      })
    case 'dev':
      return start({
        rootDir,
        mode
      })
    default:
      logger.error(`Command "${mode}" not found`)
  }
}

export function run () {
  try {
    _run()
  } catch (err) {
    logger.fatal(err)
    process.exit(1)
  }
}

if (!module.parent) {
  run()
}
