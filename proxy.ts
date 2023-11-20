/*
 * @Author: sroxck
 * @Date: 2023-11-15 17:25:51
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-20 16:08:38
 * @Description: 
 */
import express from 'express'
import * as fs from 'fs'
import serveStatic from 'serve-static'
import history from 'connect-history-api-fallback'
import { createProxyMiddleware } from 'http-proxy-middleware'
import yaml from 'js-yaml'

const app = express();
const fileContents = fs.readFileSync('proxy.yml', 'utf8');
const { proxy: proxyConfig } = yaml.load(fileContents) as Record<string, any>
const { host, port, apiPrefix, target, publicPath } = proxyConfig

// 静态文件服务
app.use(
  publicPath,
  (req, res, next) => {
    serveStatic('./cebpweb', {
      index: ['index.html', '/'],
    })(req, res, next);
  }
);

// 单页应用路由重定向
app.use(
  history({
    index: `${publicPath}index.html`,
  })
);

// API代理
app.use(
  apiPrefix,
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    logLevel: 'warn',
    pathRewrite: {
      '^/(.*)/api': '/$1/api'
    },
  })
);

// 启动服务器
app.listen(port, host, () => {
  console.log(`\r`);
  console.log("\x1b[32m%s\x1b[0m", `🏆 恭喜您,启动成功! `);
  console.log(`\r`);
  console.log("\x1b[32m%s\x1b[0m", "[代理地址]:", `http://${host}:${port}${publicPath}`);
  console.log("\x1b[32m%s\x1b[0m", "[目标地址]:", `${target}`);
});
