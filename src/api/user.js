import fetch from 'common/js/fetch';
import { getUserName, getUserId } from 'common/js/util';
import { PIC_PREFIX } from 'common/js/config';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(630020, {
    menuCodeList,
    roleCode,
    updater: getUserId()
  });
}
//  保存节点
export function setNodeMenus(nodeList, roleCode) {
  return fetch(630160, {
    nodeList,
    roleCode,
    updater: getUserId()
  });
}
// 注销激活平台用户
export function activateSysUser(userId) {
  return fetch(630056, { userId, updater: getUserId() });
}
// 注销激活c端用户
export function activateUser(userId) {
  return fetch(805091, { userId, updater: getUserId() });
}

// 获取用户详情
export function getUser() {
  return getUserById(getUserId());
}

// 获取用户详情
export function getUserById(userId) {
  return fetch(630067, { userId });
}

// 为用户设置岗位
export function setUserPost(params) {
  return fetch(630058, {
    ...params,
    updater: getUserId()
  });
}
// 列表查询平台用户
export function getSysUsers() {
  return fetch(630066, { status: '0' });
}
// 列表获取
export function getListUserArchive(params) {
    return fetch(632805, params);
}

// 读取身份证正面信息
export function getIdNoFront(pic) {
    return fetch(630092, {picUrl: PIC_PREFIX + pic});
}

// 读取身份证反面信息
export function getIdNoReverse(pic) {
    return fetch(630093, {picUrl: PIC_PREFIX + pic});
}