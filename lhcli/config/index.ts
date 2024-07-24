const admin = "后台管理系统";
const mini = "小程序";
const app = "app";
const bigScreen = "数据大屏";
const nuxt = "nuxt项目";

export const projectTypeList = [admin, mini, app, bigScreen, nuxt] as const;

export const projectTypeTemplateUrl = {
  [admin]: "direct:https://gitee.com/Lh-fantasy/project-template.git#main",
  [nuxt]: "direct:https://gitee.com/Lh-fantasy/project-template.git#nuxt",
  [mini]: "2",
  [app]: "23",
  [bigScreen]: "23",
};
