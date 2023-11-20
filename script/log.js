/**
 * @Author: sroxck
 * @Date: 2023-11-17 14:37:30
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-17 18:11:45
 * @Description: 
 */
const success = "\x1b[32m%s\x1b[0m"
const error = "\x1b[31m%s\x1b[0m"
// 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
// 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
export const proxyLog = (msg) => {
  proxyLog.info(msg)
}
proxyLog.success = (msg) => console.log(success, "[代理成功]:", msg);
proxyLog.error = (msg) => console.log(error, "[代理失败]:", msg);
proxyLog.info = (msg) => console.log(msg)
