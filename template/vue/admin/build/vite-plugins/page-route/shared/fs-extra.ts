import { remove, ensureFile, writeFile } from 'fs-extra'
export async function useFsExtra() {
  return {
    remove,
    ensureFile,
    writeFile,
  }
}
