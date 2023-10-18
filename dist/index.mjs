const { fileURLToPath } = require("url");
const { blue, cyan, green, white } = require("kolorist");
const { join, dirname, resolve } = require("path");
const fs = require("fs-extra");
const prompts = require("prompts");

const FRAMEWORKS = [
  {
    name: "vue",
    color: green,
    variants: [
      {
        name: "admin",
        color: white,
      },
      {
        name: "screen",
        color: white,
      },
    ],
  },
];
function formatTargetDir(targetDir) {
  return targetDir.trim().replace(/\/+$/g, "");
}
async function init() {
  const response = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0:",
      initial: "",
      validate: (val) => !!formatTargetDir(val),
    },
    {
      type: "select",
      name: "framework",
      message: "\u8BF7\u9009\u62E9\u6846\u67B6:",
      choices: FRAMEWORKS.map((framework) => ({
        title: framework.color(framework.name),
        value: framework,
      })),
    },
    {
      type: "select",
      name: "templateName",
      message: "\u8BF7\u9009\u62E9\u6A21\u677F:",
      choices: (framework) => {
        return framework.variants.map((variant) => ({
          title: variant.color(variant.name),
          value: variant.name,
        }));
      },
    },
  ]).catch((err) => {
    console.log(err);
  });
  const projectName = response?.projectName;
  const frameworkName = response?.framework.name;
  const templateName = response?.templateName;
  const cwd = process.cwd();
  const root = join(cwd, projectName);
  await fs.ensureDir(root);
  const existing = await fs.readdir(root);
  if (existing.length) {
    console.error(
      `Error: \u76EE\u6807\u76EE\u5F55\u4E0D\u662F\u4E00\u4E2A\u7A7A\u6587\u4EF6\u5939.`
    );
    process.exit(1);
  }
  const dirPath = dirname(fileURLToPath(import.meta.url));
  const templateDir = resolve(
    dirPath,
    "../template",
    frameworkName,
    templateName
  );
  function readDirFile(path, dirPath2) {
    const files = fs.readdirSync(path, { withFileTypes: true });
    files.forEach((file) => {
      const filePath = join(dirPath2, file.name);
      if (!filePath.includes("node_modules")) {
        if (file.isDirectory()) {
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
          }
          readDirFile(resolve(path, file.name), filePath);
        } else {
          fs.copyFileSync(join(path, file.name), filePath);
        }
      }
    });
  }
  readDirFile(templateDir, root);
  console.log(`
    \u60A8\u7684\u9879\u76EE\u521B\u5EFA\u5728 ${blue(root)}...

    \u8FD0\u884C\u547D\u4EE4:

      cd ${cyan(projectName)}
      pnpm install
      pnpm run dev
  `);
}
init().catch((err) => {
  console.log(`\u521B\u5EFA\u6A21\u677F\u5931\u8D25 ${err}`);
});
