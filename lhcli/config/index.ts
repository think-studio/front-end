const admin = "后台管理系统";
const mini = "小程序";
const app = "app";
const bigScreen = "数据大屏";

export const projectTypeList = [admin, mini, app, bigScreen] as const;

export const projectTypeTemplateUrl = {
  [admin]: "direct:https://gitee.com/Lh-fantasy/project-template.git#main",
  [mini]: "2",
  [app]: "23",
  [bigScreen]: "23",
};
