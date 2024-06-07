import { args, server } from './cli.js'
import axios from 'axios'

const response = await axios.get(
  new URL('/.api/contribute/url', server).toString()
)

const url: string = response.data

console.info('url:', url)

const stream = await axios.get(url, {
  responseType: 'stream'
})

const path = url
  .replace(/^.*:\/\//, '')

console.info('path:', path)

await axios(
  {
    method: 'post',
    url: new URL(path, server).toString(),
    data: stream.data,
    headers: {
      'user-name': args.name,
      'user-email': args.email
    }
  }
)
