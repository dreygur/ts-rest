import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outdir: 'dist',
  platform: 'node',
  target: ['es2020'],
  external: [
    'nodemailer-mailgun-transport',
    'sequelize',
    '@levminer/speakeasy',
    'nodemailer',
    'dotenv'
  ]
})
console.log(result)