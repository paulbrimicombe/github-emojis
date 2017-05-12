#!/usr/bin/env node

const rp = require('request-promise')
const fs = require('fs')

const headerLines = [
  '## Emoji list',
  '',
  '| Icon | Code |',
  '|---|---|'
]

const githubGet = (uri) => {
  return rp({
    uri,
    headers: {
      'User-Agent': 'NodeJS'
    },
    json: true
  })
}

githubGet('https://api.github.com/emojis')
  .then((results) => Object.keys(results))
  .then((keys) => keys.map((key) => `| :${key}: | \`:${key}:\` |`))
  .then((lines) => headerLines.concat(lines))
  .then((lines) => lines.join('\n'))
  .then((data) => {
    const baseReadme = fs.readFileSync('README-base.md')
    fs.writeFileSync('README.md', baseReadme + data)
  })
