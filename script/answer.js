/**
 * @Author: sroxck
 * @Date: 2023-11-20 15:31:24
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-20 16:12:03
 * @Description: 
 */
import { select, input } from '@inquirer/prompts';

export async function proxySelectPrompt() {
  return await select({
    message: '请选择配置文件生成方式',
    choices: [
      {
        name: '自动',
        value: false,
        description: '根据指令提示自动生成代理配置信息',
      },
      {
        name: '手动',
        value: true,
        description: '稍后在生成的proxy.yml中手动修改配置',
      },
      
    ],
  });
}
export async function proxyInputPrompt() {
  const target = await input({ message: '请输入代理目标地址' });
  const apiPrefix = await input({ message: '请输入代理api前缀' });
  const publicPath = await input({ message: '请输入代理二级目录' });
  return {
    target,
    apiPrefix,
    publicPath
  }
}
export async function isReWritePrompt() {
  return await select({
    message: '检测到当前目录已经存在配置文件,是否重新创建',
    choices: [
      {
        name: '是',
        value: true,
        description: '重新创建并指定配置参数',
      },
      {
        name: '否',
        value: false,
        description: '使用现有的配置文件',
      },
    ],
  });
}
