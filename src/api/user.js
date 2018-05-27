import fetch from 'common/js/fetch';
import { getUserName, getUserId } from 'common/js/util';

export function setRoleMenus(menuCodeList, roleCode) {
  return fetch(630020, {
    menuCodeList,
    roleCode,
    updater: getUserName()
  });
}
//  保存节点
export function setNodeMenus(nodeList, roleCode) {
  return fetch(630160, {
    nodeList,
    roleCode,
    updater: getUserName()
  });
}
// 注销激活平台用户
export function activateSysUser(userId) {
  return fetch(630056, { userId, updater: getUserName() });
}
// 注销激活业务员
export function activateSaleUser(userId) {
  return fetch(630126, { userId, updater: getUserName() });
}
// 注销激活c端用户
export function activateUser(userId) {
  return fetch(805091, { userId, updater: getUserName() });
}

// 获取用户详情
export function getUser() {
  return getUserById(getUserId());
}

// 获取用户详情
export function getUserById(userId) {
  return fetch(630067, { userId });
}

// 获取业务员详情
export function getSaleUser() {
  return getUserById(getUserId());
}

// 获取业务员详情
export function getSaleUserById(userId) {
  return fetch(630137, { userId });
}
