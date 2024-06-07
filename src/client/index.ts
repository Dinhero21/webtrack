#!/usr/bin/env node

import { command } from './cli.js'

switch (command) {
  case 'contribute':
    import('./contribute.js')
    break
  case 'suggest':
    import('./suggest.js')
    break
  default:
    throw new Error(`Unknown command: ${command}`)
}
