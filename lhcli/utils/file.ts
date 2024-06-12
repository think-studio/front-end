import chalk from "chalk";
import fs from "fs/promises";
import ora from "ora";
import path from "path";

const spinner = ora();

function createFolder(name: string) {
  const folderPath = path.join(process.cwd(), name);
  return fs
    .mkdir(folderPath, {
      recursive: true,
    })
    .catch((error) => {
      spinner.fail(chalk.red("download error:\n") + error.message);
    });
}

function writeFile(folderPath: string, fileName: string, data: any) {
  const filePath = path.join(folderPath, fileName);
  fs.writeFile(filePath, data, {
    flag: "wx",
  })
    .then((res) => {
      spinner.succeed(
        `✨ ${chalk.cyan(`[${filePath}]`)}` +
          " - create and wirte successfully!"
      );
    })
    .catch((error) => {
      spinner.fail(chalk.red("create and wirte error:\n") + error.message);
    });
}

function rmFolder(folderPath: string) {
  fs.rm(folderPath, {
    force: true,
    recursive: true,
  })
    .then((res) => {
      spinner.succeed(
        `✨ ${chalk.cyan(`[${folderPath}]`)}` + " - remove successfully!"
      );
    })
    .catch((error) => {
      spinner.fail(chalk.red("remove error:\n") + error.message);
    });
}

export { createFolder, rmFolder, writeFile };
