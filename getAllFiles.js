import path from 'path'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url'

export function getAllFilesInDir(folder) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  // console.log({ __filename, __dirname })
  try {
    const filenames = readdirSync(path.join(__dirname, folder))
    // console.log({ filenames })
    return filenames.map(filename => ({
      fullpath: path.join(__dirname, folder, filename),
      filename,
    }))
  } catch (err) {
    return []
  }
}
