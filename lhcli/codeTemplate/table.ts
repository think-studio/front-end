import { capitalizeFirstLetter } from "../utils";

export function getTableTemplate(name: string, path: string) {
  const upperCaseName = capitalizeFirstLetter(name);
  return `
<template>
    <BasicTable @register="registerTable" />
</template>
<script lang="ts" setup name="${upperCaseName}">
import { BasicTable, useTable } from '@/components/Table';
import { ${name}PageListApi } from '@/api/${path}}';
import { columns, searchFormSchema } from './${name}.data';

const [registerTable] = useTable({
  title: '',
  api: ${name}PageListApi,
  useSearchForm: true,
  columns,
  formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
  },
});
</script>`;
}

export function getTableModalTemplate(name: string, path: string) {
  const upperCaseName = capitalizeFirstLetter(name);
  return `
<template>
<div>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" v-auth="['${name}:btn:add']" @click="handleAdd"> 新 增 </a-button>
    </template>
    <template #action="{ record, column }">
      <TableAction :actions="createActions(record, column)" />
    </template>
  </BasicTable>
  <FormModal @register="registerModal" @reload="reload" />
</div>
</template>
<script lang="ts" setup name=${upperCaseName}>
import { toRaw } from 'vue';
import {
  BasicTable,
  useTable,
  TableAction,
  BasicColumn,
  ActionItem,
  EditRecordRow,
} from '@/components/Table';
import { ${name}PageListApi, delete${upperCaseName}ByIdApi } from '@/api/${path}';
import { useModal } from '@/components/Modal';
import FormModal from './formModal.vue';
import { columns, searchFormSchema } from './${name}.data';

const [registerTable, { reload }] = useTable({
  title: '',
  api: ${name}PageListApi,
  useSearchForm: true,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
  },
  actionColumn: {
    width: 160,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    fixed: undefined,
  },
});

const [registerModal, { openModal }] = useModal();

function handleAdd() {
  openModal(true, {
    isUpdate: false,
  });
}

function handleEdit(record) {
  openModal(true, {
    isUpdate: true,
    record,
  });
}

function handleDelete(record) {
  delete${upperCaseName}ByIdApi(record.id).then((res) => {
    if (res.code === 200) {
      reload();
    }
  });
}
const createActions = (record: BasicColumn, _: EditRecordRow): ActionItem[] => [
  {
    label: '编辑',
    icon: 'clarity:note-edit-line',
    auth: ['${name}:btn:edit'],
    onClick: handleEdit.bind(null, toRaw(record)),
  },
  {
    label: '删除',
    icon: 'ant-design:delete-outlined',
    auth: ['${name}:btn:delete'],
    color: 'error',
    popConfirm: {
      title: '是否确认删除',
      confirm: handleDelete.bind(null, record),
    },
  },
];
</script>`;
}

export function getTableDrawerTemplate(name: string, path: string) {
  const upperCaseName = capitalizeFirstLetter(name);
  return `
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" v-auth="['${name}:btn:add']" @click="handleAdd"> 新 增 </a-button>
      </template>
      <template #action="{ record, column }">
        <TableAction :actions="createActions(record, column)" />
      </template>
    </BasicTable>
    <FormDrawer @register="registerDrawer" @success="reload"/>
  </div>
</template>

<script lang="ts" setup name="${upperCaseName}">
import { ${name}PageListApi, delete${upperCaseName}ByIdApi } from '@/api/${path}';
import { searchFormSchema, columns } from './${name}.data';
import {
  BasicTable,
  useTable,
  TableAction,
  EditRecordRow,
  BasicColumn,
  ActionItem,
} from '@/components/Table';
import { useDrawer } from '@/components/Drawer';
import FormDrawer from './formDrawer.vue';

const [registerTable, { reload }] = useTable({
  title: '',
  api: ${name}PageListApi,
  useSearchForm: true,
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
  },
  actionColumn: {
    width: 200,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
});

const [registerDrawer, { openDrawer }] = useDrawer();

function handleEdit(id) {
  openDrawer(true, {
    isUpdate: true,
    id,
  });
}

function handleDelete(record) {
  delete${upperCaseName}ByIdApi(record.id).then((res) => {
    if (res.code === 200) {
      reload();
    }
  });
}
const createActions = (record: BasicColumn, _: EditRecordRow): ActionItem[] => [
  {
    label: '编辑',
    icon: 'clarity:note-edit-line',
    auth: ['${name}:btn:edit'],
    onClick: handleEdit.bind(null, record.id),
  },
  {
    label: '删除',
    icon: 'ant-design:delete-outlined',
    auth: ['${name}:btn:delete'],
    color: 'error',
    popConfirm: {
      title: '是否确认删除',
      confirm: handleDelete.bind(null, record),
    },
  },
];

function handleAdd() {
  openDrawer(true, {
    isUpdate: false,
  });
}
</script>`;
}
