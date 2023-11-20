/**
 * @Author: sroxck
 * @Date: 2023-11-17 14:19:11
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-20 16:10:23
 * @Description: 
 */
import yaml from 'js-yaml'
import { fileURLToPath } from 'url';
import path from 'path';
export function safeScope(fn) {
  if (typeof fn !== 'function') return
  try {
    fn()
  } catch (error) {
    console.error(error)
  }
}

export const yamConfig = {
  proxy: {
    host: 'localhost',
    port: 9000,
    publicPath:'/',
    apiPrefix: '/api/',
    target: 'http://www.example.org'
  }
}

export const parseToYaml = (obj) => yaml.dump(obj)


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
