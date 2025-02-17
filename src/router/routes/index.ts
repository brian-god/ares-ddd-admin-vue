import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true
});

function formatModules(_modules: any, result: RouteRecordRaw[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export const appRoutes: RouteRecordRaw[] = formatModules(modules, []);

export const appExternalRoutes: RouteRecordRaw[] = formatModules(externalModules, []);
