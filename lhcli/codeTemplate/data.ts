export function getDataTemplate() {
  return `
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    dataIndex: '',
    title: '',
  },
  {
    dataIndex: '',
    title: '创建时间'
  },

];
export const searchFormSchema: FormSchema[] = [
  {
    field: '',
    label: '',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
];
export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'Id',
    component: 'Input',
    show: false,
  },
];`;
}
