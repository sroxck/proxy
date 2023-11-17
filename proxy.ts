import express from 'express'
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import serveStatic  from 'serve-static'
import history  from 'connect-history-api-fallback'

import { createProxyMiddleware } from 'http-proxy-middleware'
// 使用__dirname来获取当前模块的目录路径
const app = express();
const rootPath = path.join(__dirname, './cebpweb'); // 根目录的绝对路径
import jsyaml from 'js-yaml'
const fileContents = fs.readFileSync('proxy.yml', 'utf8');
const { proxy: proxyCOnfig } = jsyaml.load(fileContents);
const { host, port, apiPrefix, target } = proxyCOnfig
// console.log(proxyCOnfig, 'data')
// app.use(
//   '/',
//   createProxyMiddleware({
//     target: 'http://www.baidu.com/',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/(.*)/api': '/$1/api'
//     },
//   })
// );
// 处理根路径的请求，显示根目录列表
const publicPath = '/cebpweb/';

// 静态文件服务
// 静态文件服务
app.use(  
  publicPath,
  (req, res, next) => {
    if (req.originalUrl === '/cebpweb/dir') {
      // 在这里处理 /dir 的逻辑
      // ...
      // return res.send('222')
      next()
    } else {
      // 继续静态文件服务
      serveStatic('./cebpweb', {
        index: ['index.html', '/'],
      })(req, res, next);
    }
  }
);
const proxyTarget = 'https://dev-cebp.boyachain.cn/';

// 单页应用路由重定向
app.use(
  history({
    index: `${publicPath}index.html`,
  })///////////////////////////////
);
// API代理
app.use(
  apiPrefix,
  createProxyMiddleware({
    target: proxyTarget,
    changeOrigin: true,
    logLevel: 'warn',
    pathRewrite: {
      '^/(.*)/api': '/$1/api'
    },
  })
);

app.get('/dir', (req, res) => {
  // 读取根目录下的文件和文件夹
  fs.readdir(rootPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // 构建文件列表的 HTML
    const html = files
      .map((file) => {
        const filePath = path.join(rootPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        const link = isDirectory ? `/${file}/` : `/${file}`;
        return `<li><a href="${link}">${file}</a></li>`;
      })
      .join('');

    // 返回文件列表的 HTML
    res.send(`<ul>${html}</ul>`);
  });
});

// 处理子目录的请求，显示子目录列表
app.get('/:folder', (req, res) => {
  const folder = req.params.folder;
  console.log(req.params, 'req')
  const folderPath = path.join(rootPath, folder);
  console.log(folderPath, 'folderPath')
  // 如果是文件,直接返回
  console.log(folder,'folder')
  if (folder !='favicon.ico' && fs.statSync(folderPath).isFile()  ) {
    // 读取文件内容并返回
    fs.readFile(folderPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      res.send(`${data}`);
    });
    return;
  }
  // 检查子目录是否存在
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    res.status(404).send('No2t Found');
    return;
  }

  // 读取子目录下的文件和文件夹
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // 构建文件列表的 HTML
    const html = files
      .map((file) => {
        const filePath = path.join(folderPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        const link = isDirectory ? `/${folder}/${file}/` : `/${folder}/${file}`;
        return `<li><a href="${link}">${file}</a></li>`;
      })
      .join('');

    // 返回文件列表的 HTML
    res.send(`<ul>${html}</ul>`);
  });
});

// 处理文件的请求，显示文件内容
app.get('/:folder/:file', (req, res) => {
  console.log(req.params)
  const folder = req.params.folder;
  const file = req.params.file;
  const filePath = path.join(rootPath, folder, file);
  console.log(folder, 'folderfolder')
  // 检查文件是否存在
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.status(404).send('2 Found');
    return;
  }

  // 读取文件内容并返回
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send(`${data}`);
  });
});

// 启动服务器
app.listen(port, host,() => {
  console.log("\x1b[32m%s\x1b[0m", "[代理成功]:", ` http://${host}:${port}${publicPath}`);
  // console.log("\x1b[34m%s\x1b[0m", `👑 代理启动成功: http://${host}:${port}${publicPath}`);
  // console.log(`👑 代理启动成功: http://${host}:${port}${publicPath}`);
});
