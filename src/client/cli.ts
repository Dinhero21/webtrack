import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const args = await yargs(hideBin(process.argv))
  .option('server', {
    type: 'string',
    description: 'Server URL',
    demandOption: true
  })
  .option('name', {
    type: 'string',
    description: 'User Name',
    demandOption: false
  })
  .option('email', {
    type: 'string',
    description: 'User Email',
    demandOption: false
  })
  .command('suggest <website>', 'Suggest a website to be monitored')
  .command('contribute', 'Donate your internet (mostly IP)')
  .parse()

export const server = args.server

export const command = args._.join(' ')
