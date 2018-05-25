import { getUserName } from 'common/js/util';
import fetch from 'common/js/fetch';

export function lowerFrame(code) {
  return fetch(630404, { code, updater: getUserName() });
}

export function onShelf(code) {
  return fetch(630403, { code, updater: getUserName() });
}

export function lowerFrameSys(code, location, orderNo) {
  return fetch(630414, { code, updater: getUserName(), location, orderNo });
}

export function onShelfSys(code, location, orderNo) {
  return fetch(630413, { code, updater: getUserName(), location, orderNo });
}

export function lowerFrameShape(code, location, orderNo) {
  return fetch(630424, { code, updater: getUserName(), location, orderNo });
}

export function onShelfShape(code, location, orderNo) {
  return fetch(630423, { code, updater: getUserName(), location, orderNo });
}

//  发送短信，消息推送
export function sendMsg(code, way) {
  return fetch(630531, { code, way });
}

//  商品分类上架
export function putaway(code) {
  return fetch(808003, { code, updater: getUserName() });
}

//  商品分类下架
export function soldOut(code) {
  return fetch(808004, { code, updater: getUserName() });
}

//  商品上架
export function goodsputaway(code) {
  return fetch(808013, { code, updater: getUserName() });
}

//  商品下架
export function goodssoldOut(code) {
  return fetch(808014, { code, updater: getUserName() });
}

//  确认收货
export function receiveGoods(code) {
  return fetch(808057, { code, updater: getUserName() });
}

//  取消订单
export function cancelBill(code, userId) {
  return fetch(808053, { code, userId, updater: getUserName() });
}