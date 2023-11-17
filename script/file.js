/**
 * @Author: sroxck
 * @Date: 2023-11-16 17:39:48
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-17 15:15:13
 * @Description: 
 */
import fs from "node:fs"

export const checkPathExist = (dirPath) => fs.existsSync(dirPath)
export const checkIsDir = (dirPath) => fs.statSync(dirPath).isDirectory()
export const writeFileSync = (filePath, data) => fs.promises.writeFile(filePath, data)
