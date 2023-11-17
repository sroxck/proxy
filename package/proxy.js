import path from "node:path"
import { cwd } from "node:process"
import { checkIsDir, checkPathExist, writeFileSync } from "./file.js"
import { safeScope, yamConfig, parseToYaml } from "./utils.js"
import { proxyLog } from "./log.js"
import { runProxy } from './core.js'
export function proxyHandle(program) {
  safeScope(async () => {
    const target = program.args[0]
    if (!target) return proxyLog.error('请指定要代理的项目目录名称')
    // 将配置对象转为yaml格式,写入文件
    const config = parseToYaml(yamConfig)
    const dirPath = path.join(cwd(), target || '');
    // 路径存在并且是文件夹
    if (!checkPathExist(dirPath)) return proxyLog.error('请指定要代理的项目目录名称')
    if (checkIsDir(dirPath)) {
      // 创建一个proxy.yam文件
      await writeFileSync(`${cwd()}/proxy.yml`, config)
      runProxy()
    }
  })
}
