<!--
 * @Author: sroxck
 * @Date: 2023-11-17 15:23:46
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-20 09:42:34
 * @Description: 
-->
# proxy-cli
Proxy the compiled static files of the vue project by cli
## Install
cli:
``` bash
npm i -g proxy-static-server
```

local:
```bash
npm run build 
npm link 
proxy [dir]
```
or
``` bash
# manual write proxy.yaml config
npm run build
npm run proxy
```
## Usage

``` bash
proxy [dir]

Options:
1. apiPrefix
2. proxyTarget
```

## Required
NodeJs >= 18.0.0
