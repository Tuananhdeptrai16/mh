import { isArray, isEmpty } from 'src/shared/utils/Typeof';

export const checkRouteActive = (pathname, route) => {
  return pathname.includes(route?.path);
};

export const getOpenKeys = (pathname, routes, parentKeys = []) => {
  let rs;
  routes.forEach((route) => {
    if (!isEmpty(rs)) return;
    if (!isEmpty(route.children)) {
      rs = getOpenKeys(pathname, route.children, [...parentKeys, route?.id]);
    } else if (checkRouteActive(pathname, route)) {
      rs = [...parentKeys, `${route?.id}__${route?.path}`];
    }
  });

  return rs;
};

export const getPramByKey = (key = '', routes = []) => {
  const routesFindByKey = routes?.find((item) => {
    return item?.id?.toUpperCase() === key?.toUpperCase();
  });

  // let pathUrlNotParam = null;

  function findPathWithoutHttp(route) {
    if (route.path) {
      return route.path;
    }
    if (!isEmpty(route?.children) && isArray(route?.children)) {
      for (let item of route?.children) {
        let result = findPathWithoutHttp(item);
        if (result) return result;
      }
    }
    return null;
  }
  const pathInDomain = findPathWithoutHttp(routesFindByKey);
  if (pathInDomain) {
    return pathInDomain;
  }
};
