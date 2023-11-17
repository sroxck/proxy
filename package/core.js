/**
 * @Author: sroxck
 * @Date: 2023-11-17 14:43:20
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-17 15:59:04
 * @Description: 
 */
import { exec } from 'node:child_process'
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const proxyPath = path.join(__dirname, '../proxy.ts');
export function runProxy(){
  // 暂时使用tsx 运行proxy.ts 获取一个子进程 (后续使用node 执行编译后的proxy.js)
  const childProcess = exec(`tsx ${proxyPath}`);
  // 监听子进程的输出,并直接输出
  childProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  // 监听子进程的错误输出,并直接输出
  childProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  // 监听子进程的退出状态,并直接输出
  childProcess.on('close', (code) => {
    console.log('代理结束,退出码:', code);
  });
}
