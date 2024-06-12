import { capitalizeFirstLetter } from "../utils";

export function getApiTemplate(name: string) {
  const upperCaseName = capitalizeFirstLetter(name);
  return `
import { defHttp } from '@/utils/http/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { BasicFetchPageResult, BasicFetchResult } from '@/api/model/baseModel';
import { ${upperCaseName} } from './model/model';

// 列表
export const ${name}PageListApi = (params) => {
    return defHttp.post<BasicFetchPageResult<${upperCaseName}>>({
        url: "",
        data: params,
    });
};

// 新增
export const add${upperCaseName}Api = (params) => {
    return defHttp.post({
        url: "",
        data: params,
    });
};

// 编辑
export const update${upperCaseName}Api = (params) => {
    return defHttp.post({
        url: "",
        data: params,
    });
};

// 删除
export const delete${upperCaseName}ByIdApi = (id: string) => {
    return defHttp.post<BasicFetchResult<Boolean>>({
        url: "",
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

// 详情
export const ${name}DetailByIdApi = (id: string) => {
    return defHttp.post<BasicFetchResult<${upperCaseName}>>({
        url: "",
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};`;
}

export function getModelTemplate(name: string) {
  const upperCaseName = capitalizeFirstLetter(name);
  return `
export interface ${upperCaseName} {
 
}`;
}
