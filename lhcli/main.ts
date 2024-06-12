import { program } from "commander";
import { generateAdminModule, rmAdminModule } from "./core/admin";
import createApp from "./core/createApp";

function main() {
  program.name("lhcli").version("1.0.0").description("前端项目生成脚手架");

  program
    .command("create")
    .description("创建项目")
    .action(() => {
      createApp();
    });

  program
    .command("admin")
    .argument("<string>", "模块名称")
    .option("-g [string]", "生成后台管理系统的功能模块")
    .option("-modal", "表单为弹框形式")
    .option("-drawer", "表单为抽屉形式")
    .option("-rm [string]", "生成后台管理系统的功能模块")
    .action((moduleName, args) => {
      if (args["g"]) {
        let formContainer: AdminFormContainer = undefined;
        formContainer = args["Modal"]
          ? "modal"
          : args["Drawer"]
          ? "drawer"
          : undefined;
        let parentFolder =
          typeof args["g"] === "boolean" ? undefined : args["g"];
        generateAdminModule(moduleName, parentFolder, formContainer);
      }
      Object.keys(args).forEach((key) => {
        if (key === "generate") {
        } else if (key === "Rm") {
          let parentFolder =
            typeof args["Rm"] === "boolean" ? undefined : args["Rm"];
          rmAdminModule(moduleName, parentFolder);
        }
      });
    });
  program.parse();
}

main();
