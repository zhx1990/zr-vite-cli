import { access } from 'fs/promises'

export async function handleEslintFormat(filePath: string) {
  const { execa } = await import('execa')

  const eslintBinPath = `${process.cwd()}/node_modules/eslint/bin/eslint.js`

  try {
    await access(eslintBinPath)
    await execa('node', [eslintBinPath, filePath, '--fix'])
  } catch {
    console.log('eslint not found')
  }
}
