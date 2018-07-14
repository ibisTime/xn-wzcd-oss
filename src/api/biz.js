import {
  getUserName,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';

export function lowerFrame(code) {
  return fetch(630404, {
    code,
    updater: getUserId()
  });
}

export function onShelf(code) {
  return fetch(630403, {
    code,
    updater: getUserId()
  });
}

export function lowerFrameSys(code, location, orderNo) {
  return fetch(630414, {
    code,
    updater: getUserId(),
    location,
    orderNo
  });
}

export function onShelfSys(code, location, orderNo) {
  return fetch(630413, {
    code,
    updater: getUserId(),
    location,
    orderNo
  });
}

export function lowerFrameShape(code, location, orderNo) {
  return fetch(630424, {
    code,
    updater: getUserId(),
    location,
    orderNo
  });
}

export function onShelfShape(code, location, orderNo) {
  return fetch(630423, {
    code,
    updater: getUserId(),
    location,
    orderNo
  });
}

//  发送短信，消息推送
export function sendMsg(code, way) {
  return fetch(630531, {
    code,
    way
  });
}

//  商品分类上架
export function putaway(code) {
  return fetch(808003, {
    code,
    updater: getUserId()
  });
}

//  商品分类下架
export function soldOut(code) {
  return fetch(808004, {
    code,
    updater: getUserId()
  });
}

//  商品上架
export function goodsputaway(code) {
  return fetch(808013, {
    code,
    updater: getUserId()
  });
}

//  商品下架
export function goodssoldOut(code) {
  return fetch(808014, {
    code,
    updater: getUserId()
  });
}

//  确认收货
export function receiveGoods(code) {
  return fetch(808057, {
    code,
    updater: getUserId()
  });
}

//  取消订单
export function cancelBill(code) {
  return fetch(808053, {
    code,
    updater: getUserId()
  });
}

//  贷款商品上架
export function loanGoodsPutaway(code) {
  return fetch(632173, {
    code,
    updater: getUserId()
  });
}

//  贷款商品下架
export function loanGoodsSoldOut(code) {
  return fetch(632174, {
    code,
    updater: getUserId()
  });
}
// 列表获取贷款产品
export function getListProduct() {
  return fetch(632177, {
    status: '3'
  });
}
// 抵押完成
export function done(code) {
  return fetch(632191, {
    code,
    operator: getUserId()
  });
}
// 制单
export function makeBill(code) {
  return fetch(632322, {
    code,
    operator: getUserId()
  });
}
// 提醒发起流程
export function remind(code) {
  return fetch(632281, {
    code
  });
}
// 详情查经销商管理
export function getJxsDetail(code) {
  return fetch(632066, { code });
}
// 列表查询银行
export function getBankList() {
  return fetch(802116);
}
// 车辆续保发信息
export function sendMessage(code) {
  return fetch(632340, {
    code
  });
}
// 总公司制单
export function makeAllbill(code) {
  return fetch(632173, {
    code,
    operator: getUserId()
  });
}
// 银行放款 理件完成
export function bankComplete(code) {
  return fetch(632173, {
    code,
    operator: getUserId()
  });
}
// 车辆抵押 理件完成
export function carComplete(code) {
  return fetch(632173, {
    code,
    operator: getUserId()
  });
}