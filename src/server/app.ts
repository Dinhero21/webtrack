import { renderDir } from './template.js'
import { isDotfile, safeJoin } from '../util/path.js'
import { isValidURL } from '../util/url.js'
import { spawn } from 'child_process'
import { readdir, stat } from 'fs/promises'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import bodyParser from 'body-parser'
import express from 'express'

export const app = express()

const api = express.Router()
app.use('/.api', api)

api.get('/contribute/url', (req, res) => {
  res.end('https://example.com/')
})

api.post('/suggest', bodyParser.text({ type: '*/*' }), (req, res) => {
  const url = req.body

  if (!isValidURL(url)) {
    res.status(432).end()

    return
  }

  res.end()
})

app.post('/*', bodyParser.raw({ type: 'application/octet-stream' }), (req, res) => {
  const path = resolve('/', req.path.replaceAll('//', '/'))

  if (path.split('/').some(isDotfile)) {
    res.status(403).end()

    return
  }

  const name = req.header('user-name') ?? 'anonymous'
  const email = req.header('user-email') ?? 'anonymous'

  const contribute = spawn('bash', [
    './contribute.sh',
    '.' + path,
    name,
    email
  ])

  req.pipe(contribute.stdin)
  contribute.stdout.pipe(process.stdout)
  contribute.stderr.pipe(process.stderr)

  contribute.on('exit', code => {
    if (code === 0) {
      res.status(200).end()

      return
    }

    res.status(500).end(JSON.stringify({ code }))
  })
})

app.get('/*', (req, res) => {
  void (async () => {
    const path = safeJoin('data', req.path)

    if (path.split('/').some(isDotfile)) {
      missing()

      return
    }

    try {
      const stats = await stat(path)

      if (stats.isDirectory()) {
        res.end(await renderDir(
          req.path,
          (await readdir(path))
            .filter(file => !isDotfile(file))
        ))

        return
      }

      createReadStream(path).pipe(res)
    } catch (error) {
      missing()
    }

    function missing (): void {
      res.status(404).end()
    }
  })()
})
