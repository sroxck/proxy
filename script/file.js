/**
 * @Author: sroxck
 * @Date: 2023-11-16 17:39:48
 * @LastEditors: sroxck
 * @LastEditTime: 2023-11-20 10:29:06
 * @Description: 
 */
import fs from "node:fs"

export const checkPathExist = (dirPath) => fs.existsSync(dirPath)
export const checkIsDir = (dirPath) => fs.statSync(dirPath).isDirectory()
export const writeFileSync = (filePath, data) => fs.promises.writeFile(filePath, data)
export const readFile = (filePath) => fs.readFileSync(filePath)
