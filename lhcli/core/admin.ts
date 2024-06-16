import inquirer from "inquirer";
import path from "path";
import { getApiTemplate, getModelTemplate } from "../codeTemplate/api";
import { getDataTemplate } from "../codeTemplate/data";
import { getDrawerTemplate } from "../codeTemplate/drawer";
import { getModalTemplate } from "../codeTemplate/modal";
import {
  getTableDrawerTemplate,
  getTableModalTemplate,
  getTableTemplate,
} from "../codeTemplate/table";
import { capitalizeFirstLetter } from "../utils";
import { createFolder, rmFolder, writeFile } from "../utils/file";

function wirteAdminModuleViewsFile(
  modulePath: string,
  moduleName: string,
  formContainer: AdminFormContainer
) {
  const folderPath = path.join("src", "views", modulePath);
  createFolder(folderPath).then(() => {
    writeFile(folderPath, `${moduleName}.data.ts`, getDataTemplate());
    if (formContainer === "modal") {
      writeFile(
        folderPath,
        "index.vue",
        getTableModalTemplate(moduleName, modulePath)
      );
      writeFile(
        folderPath,
        "formModal.vue",
        getModalTemplate(moduleName, modulePath)
      );
    } else if (formContainer === "drawer") {
      writeFile(
        folderPath,
        "index.vue",
        getTableDrawerTemplate(moduleName, modulePath)
      );
      writeFile(
        folderPath,
        "formDrawer.vue",
        getDrawerTemplate(moduleName, modulePath)
      );
    } else {
      writeFile(
        folderPath,
        "index.vue",
        getTableTemplate(moduleName, modulePath)
      );
    }
  });
}

function wirteAdminModuleApiFile(modulePath: string, moduleName: string) {
  const folderPath = path.join("src", "api", modulePath);
  createFolder(folderPath).then(() => {
    writeFile(folderPath, "index.ts", getApiTemplate(moduleName));
    createFolder(path.join(folderPath, "model")).then(() => {
      writeFile(
        path.join(folderPath, "model"),
        "model.ts",
        getModelTemplate(moduleName)
      );
    });
  });
}

function getFolderPath(parentFolder: string | undefined, moduleName: string) {
  const folderPath = parentFolder
    ? path.join(parentFolder, moduleName)
    : moduleName;
  return folderPath;
}

function generateAdminModule(
  moduleName: string,
  parentFolder: string | undefined,
  formContainer: AdminFormContainer
) {
  const folderPath = getFolderPath(parentFolder, moduleName);
  const finallyModuleName =
    (parentFolder ?? "") + capitalizeFirstLetter(moduleName);
  // 写入views
  wirteAdminModuleViewsFile(folderPath, finallyModuleName, formContainer);
  // 写入api
  wirteAdminModuleApiFile(folderPath, finallyModuleName);
}

async function rmAdminModule(
  moduleName: string,
  parentFolder: string | undefined
) {
  const res = await inquirer.prompt({
    name: "yes",
    type: "confirm",
    message: "是否删除" + moduleName,
  });
  const folderPath = getFolderPath(parentFolder, moduleName);

  if (res.yes) {
    rmFolder(path.join("src", "views", folderPath));
    rmFolder(path.join("src", "api", folderPath));
  }
}

export { generateAdminModule, rmAdminModule };
