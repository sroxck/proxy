/*
 * @Author: sroxck
 * @Date: 2023-11-20 10:12:10
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-20 11:01:01
 * @Description: 
 */
import yaml from 'js-yaml'
import { cwd } from 'node:process'
import { readFile } from '../script/file.js'
import { proxyLog } from '../script/log.js'
const yamlFileContent: string = readFile(cwd() + '/proxy.yml', 'utf8');
const { proxy: { host, port, apiPrefix, target } } = yaml.load(yamlFileContent) as Record<string, any>
import express from 'express'
const app = express()

app.listen(port, host, () => {
  proxyLog.success(` http://${host}:${port}`);
})
