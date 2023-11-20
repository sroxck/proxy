/**
 * @Author: sroxck
 * @Date: 2023-11-17 14:22:00
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-20 16:09:29
 * @Description:
 */
import path from "node:path"
import { cwd } from "node:process"
import { checkIsDir, checkPathExist, writeFileSync } from "./file.js"
import { safeScope, yamConfig, parseToYaml } from "./utils.js"
import { proxyLog } from "./log.js"
import { runProxy } from './core.js'
import { proxySelectPrompt, proxyInputPrompt, isReWritePrompt } from "./answer.js"
export async function proxyHandle(program) {

  safeScope(async () => {
    let isCreate = true
    const target = program.args[0]
    if (!target) return proxyLog.error('请指定要代理的项目目录名称')
    if (checkPathExist(`${cwd()}/proxy.yml`)) {
      isCreate = await isReWritePrompt()
    }
    if (isCreate) {
      const isUseDefault = await proxySelectPrompt()
      if (!isUseDefault) {
        const { target, apiPrefix, publicPath } = await proxyInputPrompt()
        yamConfig.proxy.apiPrefix = apiPrefix
        yamConfig.proxy.target = target || 'http://www.example.org'
        yamConfig.proxy.publicPath = publicPath
      }
    }
    // 将配置对象转为yaml格式,写入文件
    const dirPath = path.join(cwd(), target || '');
    const config = parseToYaml(yamConfig)
    // 路径存在并且是文件夹
    if (!checkPathExist(dirPath)) return proxyLog.error('目录不存在')
    if (checkIsDir(dirPath)) {
      // 先读取proxy.yam,如果不存在,则创建一个proxy.yam文件
      if (isCreate) {
        await writeFileSync(`${cwd()}/proxy.yml`, config)
      }
      runProxy()
    }
  })
}
