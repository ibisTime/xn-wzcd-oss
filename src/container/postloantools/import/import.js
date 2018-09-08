import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/postloantools/import';
import {
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import {
    Modal
} from 'antd';
import {
    deleteList
} from 'api/biz';
import {
    listWrapper
} from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.postloantoolsImport,
        parentCode: state.menu.subMenuCode
    }), {
        setTableData,
        clearSearchParam,
        doFetching,
        setBtnList,
        cancelFetching,
        setPagination,
        setSearchParam,
        setSearchData
    }
)
class imports extends React.Component {
    render() {
        const fields = [{
            title: '导入日期',
            field: 'importDatetime',
            type: 'date'
        }, {
            title: '客户姓名',
            field: 'realName',
            search: true
        }, {
            title: '身份证',
            field: 'idNo',
            nowrap: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余金额',
            field: 'remainAmount',
            amount: true
        }, {
            title: '总期数',
            field: 'periods'
        }, {
            title: '放款日期',
            field: 'fkDatetime',
            type: 'date'
        }, {
            title: '逾期金额',
            field: 'overdueAmount',
            amount: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '不匹配'
            }, {
                key: '1',
                value: '已匹配'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632305,
            singleSelect: false,
            searchParams: {
                status: '0'
            },
            btnEvent: {
              import: (selectedRowKeys, selectedRows) => {
                  this.props.history.push(`/postloantools/import/import`);
              },
              dispose: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '0') {
                  showWarnMsg('该条记录不是待处理状态');
                } else {
                  this.props.history.push(`/postloantools/import/dispose?code=${selectedRowKeys[0]}`);
                }
              },
              deleteList: (key, item) => {
                  if (!key || !key.length || !item || !item.length) {
                      showWarnMsg('请选择记录');
                  } else {
                      Modal.confirm({
                          okText: '确认',
                          cancelText: '取消',
                          content: '确定理件完成？',
                          onOk: () => {
                              this.props.doFetching();
                              let list = [];
                              for(let i = 0, len = item.length; i < len; i++) {
                                  list.push(item[i].code);
                              }
                              return deleteList(list).then(() => {
                                  showSucMsg('操作成功');
                                  setTimeout(() => {
                                      this.props.getPageData();
                                  }, 500);
                              }).catch(() => {
                                  this.props.cancelFetching();
                              });
                          }
                      });
                  }
              }
            }
        });
    }
}

export default imports;
