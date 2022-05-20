import path from 'path'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url'

export function getAllFilesInDir(folder) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  try {
    const filenames = readdirSync(path.join(__dirname, folder))
    return filenames.map(filename => path.join(__dirname, folder, filename))
  } catch (err) {
    return []
  }
}
