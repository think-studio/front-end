import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import { projectTypeList, projectTypeTemplateUrl } from "../config";
import downLoadTemplate from "../utils/downloadTemplate";

interface ProjectManager {
  [projectType]: typeof projectTypeList[number];
  [projectName]: string;
}

const projectType = "projectType";
const projectName = "projectName";

const spinner = ora();

async function createApp() {
  const options = [
    {
      type: "list",
      name: projectType,
      message: "请选择你要创建的项目类型：",
      choices: projectTypeList,
      default: "后台管理系统",
    },
    {
      type: "input",
      name: projectName,
      message: "请输入项目名称：",
      default: "demo",
    },
  ];

  const res = await inquirer.prompt<ProjectManager>(options);
  const tempUrl = projectTypeTemplateUrl[res[projectType]];
  const name = res[projectName];
  try {
    spinner.start(chalk.blue("正在拉取远程模板..."));
    await downLoadTemplate(tempUrl, name);
    spinner.succeed(
      `✨ ${chalk.cyan(`[${name}]`)}` + " - download successfully!"
    );
    console.log(chalk.blue(`cd ${name} `));
    console.log(chalk.red(`pnpm install`));
    console.log(chalk.yellow(`npm run dev`));
  } catch (error) {
    spinner.fail(chalk.red("download error:\n") + error);
    process.exit(1);
  }
}

export default createApp;
