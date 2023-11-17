/**
 * @Author: sroxck
 * @Date: 2023-11-17 14:19:11
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-17 14:52:53
 * @Description: 
 */
import yaml from 'js-yaml'
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
    apiPrefix: '/cebp-admin/',
    target: 'https://dev-cebp.boyachain.cn/'
  }
}

export const parseToYaml = (obj) => yaml.dump(obj)
