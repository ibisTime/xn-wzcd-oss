import { getCompList, deleteComp, updateComp } from 'api/company';
import { getOwnerBtns } from 'api/menu';
import { getSysUsers } from 'api/user';
import { showSucMsg } from 'common/js/util';

const PREFIX = 'SECURITY_COMP_CONSTRUCT_';
const SET_BUTTON_LIST = PREFIX + 'SET_BUTTON_LIST';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';
const SET_TREE_DATA = PREFIX + 'SET_TREE_DATA';
const SET_COMP_INFO = PREFIX + 'SET_COMP_INFO';
const SET_SELECTED_KEYS = PREFIX + 'SET_SELECTED_KEYS';
const SET_CHECKED_KEYS = PREFIX + 'SET_CHECKED_KEYS';
const SET_EXPANDED_KEYS = PREFIX + 'SET_EXPANDED_KEYS';
const SET_USER_LIST = PREFIX + 'SET_USER_LIST';
const SET_COMP_LIST = PREFIX + 'SET_COMP_LIST';
const SET_INIT_COMP_LIST = PREFIX + 'SET_INIT_COMP_LIST';
const SET_CUR_PARENT_CODE = PREFIX + 'SET_CUR_PARENT_CODE';

const initState = {
  fetching: false,
  msg: '',
  btnList: [],
  userList: [],
  treeData: [],
  compInfo: {},
  curParentCode: '',
  defaultExpandedKeys: [],
  checkedKeys: [],
  selectedKeys: [],
  compList: [],
  initCompList: []
};

let listInfo = {};
let compInfo = {};
let compList;

export function securityCompConstruct(state = initState, action) {
  switch(action.type) {
    case SET_BUTTON_LIST:
      return {...state, btnList: action.payload};
    case SET_TREE_DATA:
      return {...state, msg: '', treeData: action.payload};
    case SET_COMP_INFO:
      return {...state, msg: '', compInfo: action.payload};
    case SET_SELECTED_KEYS:
      return {...state, msg: '', selectedKeys: action.payload};
    case SET_CHECKED_KEYS:
      return {...state, msg: '', checkedKeys: action.payload};
    case SET_EXPANDED_KEYS:
      return {...state, msg: '', defaultExpandedKeys: action.payload};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
    case SET_USER_LIST:
      return {...state, userList: action.payload};
    case SET_COMP_LIST:
      return {...state, compList: action.payload};
    case SET_INIT_COMP_LIST:
      return {...state, initCompList: action.payload};
    case SET_CUR_PARENT_CODE:
      return {...state, curParentCode: action.payload};
    default:
      return state;
  }
}

// 显示loading
function doFetching() {
  return { type: LOADING };
}

// 隐藏loading
function cancelFetching() {
  return { type: CANCEL_LOADING };
}

// 设置页面的按钮
function setBtnList(data) {
  return { type: SET_BUTTON_LIST, payload: data };
}

// 设置treeData
export function setTreeData(data) {
  return { type: SET_TREE_DATA, payload: data };
}

// 设置compInfo
function setCompInfo(data) {
  return { type: SET_COMP_INFO, payload: data };
}

// 设置compList
function setCompList(data) {
  return { type: SET_COMP_LIST, payload: data };
}

// 设置从接口获取的初始化的complist, 用于新增公司弹窗的上下级显示用
function setInitCompList(data) {
  return { type: SET_INIT_COMP_LIST, payload: data };
}

function setCurParentCode(code) {
  return { type: SET_CUR_PARENT_CODE, payload: code };
}

// 设置选中的keys
function _setSelectedKeys(keys) {
  return { type: SET_SELECTED_KEYS, payload: keys };
}

// 设置checkbox选中的keys
function _setCheckedKeys(keys) {
  return { type: SET_CHECKED_KEYS, payload: keys };
}

// 设置选中的keys
export function setSelectedKeys(keys, setFieldsValue) {
  return dispatch => {
    dispatch(_setSelectedKeys(keys));
    dispatch(_setCheckedKeys(keys));
    let current = keys.length ? compInfo[keys[0]] : {};
    dispatch(setCurParentCode(current.parentCode));

    setFieldsValue({
      code: current.code,
      parentCode: current.parentCode === 'ROOT' ? '0' : current.parentCode,
      name: current.name || '',
      // leadName: current.leadName || '',
      // mobile: current.mobile || '',
      type: current.type || '',
      leadUserId: current.leadUserId || '',
      orderNo: current.orderNo || 1,
      provinceNo: getCityVal(current)
    });
  };
}
function getCityVal(current) {
  let prov = current.provinceNo;
  let result = [];
  if (prov) {
    let city = current.cityNo ? current.cityNo : '全部';
    let area = current.areaNo ? current.areaNo : '全部';
    result = [prov, city, area];
  }
  return result;
}

// 设置defaultExpandedKeys
function setExpandedKeys(keys) {
  return { type: SET_EXPANDED_KEYS, payload: keys };
}

// 新增部门/公司
export function addComp(company) {
  return dispatch => {
    let parentCode = company.parentCode;
    listInfo[parentCode] = listInfo[parentCode] || [];
    compInfo[company.code] = company;
    listInfo[parentCode].push({
      title: company.name,
      key: company.code,
      orderNo: company.orderNo
    });
    let tree = [];
    getTreeNode(listInfo['ROOT'], tree);
    dispatch(setTreeData(tree));
    dispatch(setCompList(tree));
    dispatch(setCompInfo(compInfo));
  };
}

// 删除公司
export function deleteCompany(code, setFieldsValue) {
  return dispatch => {
    dispatch(doFetching());
    deleteComp(code).then(() => {
      dispatch(cancelFetching());
      showSucMsg('删除成功');
      let parentCode = compInfo[code].parentCode;
      let idx = listInfo[parentCode].findIndex(v => v.key === code);
      listInfo[parentCode].splice(idx, 1);
      let tree = [];
      getTreeNode(listInfo['ROOT'], tree);
      dispatch(setTreeData(tree));
      dispatch(setCompList(tree));
      dispatch(_setSelectedKeys([]));
      dispatch(_setCheckedKeys([]));
      setFieldsValue({
        code: '',
        parentCode: '',
        name: '',
        type: '',
        leadUserId: '',
        orderNo: '',
        provinceNo: ''
      });
    }).catch(() => {
      dispatch(cancelFetching());
    });
  };
}

// 更新公司/部门
export function updateCompany(params) {
  return dispatch => {
    dispatch(doFetching());
    updateComp(params).then(() => {
      dispatch(cancelFetching());
      showSucMsg('修改成功');
      params.parentCode = params.parentCode || 'ROOT';
      let oldParentCode = compInfo[params.code].parentCode;
      let idx = listInfo[oldParentCode].findIndex(v => v.key === params.code);
      listInfo[oldParentCode].splice(idx, 1);
      compInfo[params.code] = params;
      let parentCode = params.parentCode;
      listInfo[parentCode].push({
        key: params.code,
        title: params.name,
        orderNo: params.orderNo
      });
      let tree = [];
      getTreeNode(listInfo['ROOT'], tree);
      dispatch(setTreeData(tree));
      dispatch(setCompList(tree));
      dispatch(setCompInfo(compInfo));
    }).catch(() => {
      dispatch(cancelFetching());
    });
  };
}

// 页面初始化
export function initData() {
  return (dispatch, getState) => {
    dispatch(doFetching());
    Promise.all([
      getOwnerBtns(getState().menu.subMenuCode),
      getCompList(),
      getSysUsers()
    ]).then(([btnData, compData, userList]) => {
      dispatch(cancelFetching());
      dispatch(setBtnList(btnData));
      dispatch(setInitCompList(compData));
      getTree(compData, dispatch);
      getCompTree(compData, dispatch);
      dispatch(_setSelectedKeys([]));
      dispatch(_setCheckedKeys([]));
      dispatch(setUserList(userList));
    }).catch(() => {
      dispatch(cancelFetching());
    });
  };
}
function getCompTree(data, dispatch) {
  let result = {};
  data.forEach(v => {
    v.parentCode = v.parentCode === '0' ? 'ROOT' : v.parentCode;
    if (!result[v.parentCode]) {
      result[v.parentCode] = [];
    }
    result[v.parentCode].push({
      title: v.name,
      key: v.code,
      type: v.type
    });
  });
  compList = result;
  let tree = [];
  getCompTreeNode(result['ROOT'], tree);
  dispatch(setCompList(tree));
}
function getCompTreeNode(arr, children) {
  arr.forEach(a => {
    if (compList[a.key]) {
      a.children = [];
      children.push(a);
      getCompTreeNode(compList[a.key], a.children);
    } else {
      children.push(a);
    }
  });
}
// 设置用户列表
function setUserList(list) {
  return { type: SET_USER_LIST, payload: list };
}
// 生成数结构步骤1
function getTree(data, dispatch) {
  let result = {};
  let info = {};
  data.forEach(v => {
    v.parentCode = v.parentCode === '0' ? 'ROOT' : v.parentCode;
    if (!result[v.parentCode]) {
      result[v.parentCode] = [];
    }
    info[v.code] = v;
    result[v.parentCode].push({
      title: v.name,
      key: v.code,
      orderNo: v.orderNo
    });
  });
  listInfo = result;
  compInfo = info;
  let tree = [];
  getTreeNode(listInfo['ROOT'], tree);
  dispatch(setExpandedKeys([listInfo['ROOT'][0].key]));
  dispatch(setTreeData(tree));
  dispatch(setCompInfo(compInfo));
}
// 生成数结构步骤2
function getTreeNode(arr, children) {
  arr.sort((a, b) => +a.orderNo > +b.orderNo).forEach(a => {
    if (listInfo[a.key]) {
      a.children = [];
      children.push(a);
      getTreeNode(listInfo[a.key], a.children);
    } else {
      children.push(a);
    }
  });
}
