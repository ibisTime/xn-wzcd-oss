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
} from '@redux/postloantools/budget';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg,
    makeBill
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.postloantoolsBudget,
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
class budget extends React.Component {
    render() {
        const fields = [{
            title: '预算单号',
            field: 'code',
            search: true
        }, {
            title: '业务编号',
            field: 'bizCode'
        }, {
            title: '预算金额',
            field: 'amount',
            amount: true
        }, {
            title: '代偿类型',
            field: 'type',
            type: 'select',
            key: 'replace_repay_type',
            search: true
        }, {
            title: '收款人名称',
            field: 'receiptRealName'
        }, {
            title: '收款人开户行',
            field: 'receiptBank'
        }, {
            title: '收款人账号',
            field: 'receiptAccount'
        }, {
            title: '申请人',
            field: 'applyUser',
            type: 'select',
            listCode: 630066,
            keyName: 'userId',
            valueName: 'realName',
            search: true
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            rangedate: ['applyDateStart', 'applyDateEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'replace_repay_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632325,
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/postloantools/budget/apply`);
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是待财务审核状态');
                    } else {
                        this.props.history.push(`/postloantools/budget/check?code=${selectedRowKeys[0]}`);
                    }
                },
                makebill: (key, item) => {
                  if (!key || !key.length || !item || !item.length) {
                    showWarnMsg('请选择记录');
                  } else if (item[0].status !== '2') {
                    showWarnMsg('该状态不可制单');
                  } else {
                    Modal.confirm({
                      okText: '确认',
                      cancelText: '取消',
                      content: '确定制单？',
                      onOk: () => {
                        this.props.doFetching();
                        return makeBill(key[0]).then(() => {
                          this.props.getPageData();
                          showWarnMsg('操作成功');
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

export default budget;