import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/saleuser';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import { activateSaleUser } from 'api/user';

@listWrapper(
  state => ({
    ...state.securitySaleUser,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class User extends React.Component {
  render() {
    const fields = [{
      title: '用户名',
      field: 'loginName',
      search: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'user_status'
    }, {
      title: '角色',
      field: 'roleCode',
      type: 'select',
      listCode: '630006',
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 630135,
      rowKey: 'userId',
      btnEvent: {
        add: () => {
          this.props.history.push(`/system/saleuser/addedit?s=1`);
        },
        reset: (keys, items) => {
          if (!keys || !keys.length || !items || !items.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/system/saleuser/pwd_reset?s=1&userId=${keys[0]}`);
          }
        },
        rock: (keys, items) => {
          if (!keys || !keys.length || !items || !items.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: `确认${items[0].status === '0' ? '注销' : '激活'}用户？`,
              onOk: () => {
                this.props.doFetching();
                return activateSaleUser(keys[0]).then(() => {
                  this.props.getPageData();
                  showWarnMsg('操作成功');
                }).catch(() => {
                  this.props.cancelFetching();
                });
              }
            });
          }
        },
        assign: (keys, items) => {
          if (!keys || !keys.length || !items || !items.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/system/saleuser/role?s=1&userId=${keys[0]}`);
          }
        },
        addPost: (keys, item) => {
          if (!keys || !keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/system/saleuser/post?s=1&userId=${keys[0]}`);
          }
        }
      }
    });
  }
}

export default User;
