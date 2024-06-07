import { args, server } from './cli.js'
import { valid } from '../util/none.js'
import axios from 'axios'

await axios.post(
  new URL('/.api/suggest', server).toString(),
  valid(args.website, new Error('website is required'))
)
