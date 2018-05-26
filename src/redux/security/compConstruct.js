import { getCompList } from 'api/company';
import { getOwnerBtns } from 'api/menu';

const PREFIX = 'SECURITY_COMP_CONSTRUCT_';
const SET_BUTTON_LIST = PREFIX + 'SET_BUTTON_LIST';
const LOADING = PREFIX + 'LOADING';
const CANCEL_LOADING = PREFIX + 'CANCEL_LOADING';
const SET_TREE_DATA = PREFIX + 'SET_TREE_DATA';
const SET_SELECTED_KEYS = PREFIX + 'SET_SELECTED_KEYS';
const SET_CHECKED_KEYS = PREFIX + 'SET_CHECKED_KEYS';

const initState = {
  fetching: false,
  msg: '',
  btnList: [],
  treeData: [],
  defaultExpandedKeys: [],
  checkedKeys: [],
  selectedKeys: []
};

export function securityCompConstruct(state = initState, action) {
  switch(action.type) {
    case SET_BUTTON_LIST:
      return {...state, btnList: action.payload};
    case SET_TREE_DATA:
      return {...state, msg: '', treeData: action.payload};
    case SET_SELECTED_KEYS:
      return {...state, msg: '', selectedKeys: action.payload};
    case SET_CHECKED_KEYS:
      return {...state, msg: '', checkedKeys: action.payload};
    case LOADING:
      return {...state, fetching: true};
    case CANCEL_LOADING:
      return {...state, fetching: false};
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

// 设置选中的keys
function _setSelectedKeys(keys) {
  return { type: SET_SELECTED_KEYS, payload: keys };
}

// 设置checkbox选中的keys
function _setCheckedKeys(keys) {
  return { type: SET_CHECKED_KEYS, payload: keys };
}

// 设置选中的keys
export function setSelectedKeys(keys) {
  _setCheckedKeys(keys);
  _setSelectedKeys(keys);
}

// 页面初始化
export function initData() {
  return (dispatch, getState) => {
    dispatch(doFetching());
    Promise.all([
      getOwnerBtns(getState().menu.subMenuCode),
      getCompList()
    ]).then(([btnData, compData]) => {
      dispatch(cancelFetching());
      dispatch(setBtnList(btnData));
      // getTree(compData, dispatch);
    });
  };
}

function getTree(data, dispatch) {
  let result = {};
  data.forEach(v => {
    v.parentCode = v.parentCode || 'ROOT';
    if (!result[v.parentCode]) {
      result[v.parentCode] = [];
    }
    result[v.parentCode].push({
      title: v.name,
      key: v.code
    });
  });
  let tree = [];
  getTreeNode(result['ROOT'], tree, result);
  dispatch(setTreeData(tree));
}
function getTreeNode(arr, children, result) {
  arr.forEach(a => {
    if (result[a.key]) {
      a.children = [];
      children.push(a);
      getTreeNode(result[a.key], a.children, result);
    } else {
      children.push(a);
    }
  });
}
