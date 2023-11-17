/**
 * @Author: sroxck
 * @Date: 2023-11-17 14:37:30
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-17 15:16:59
 * @Description: 
 */
const success = "\x1b[32m%s\x1b[0m"
const error = "\x1b[31m%s\x1b[0m"

export const proxyLog = (msg) => {
  proxyLog.info(msg)
}
proxyLog.success = (msg) => console.log(success, "[代理成功]:", msg);
proxyLog.error = (msg) => console.log(error, "[代理失败]:", msg);
proxyLog.info = (msg) => console.log(msg)
