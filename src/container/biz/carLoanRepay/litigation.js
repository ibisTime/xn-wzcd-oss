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
} from '@redux/biz/litigation';
import {
    listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  formatDate
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    litigationAgain
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.bizLitigation,
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
class litigation extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            render: (v, d) => {
                return d.budgetOrder.code;
            },
            search: true
        }, {
            title: '被诉对象姓名',
            field: 'realName'
        }, {
            title: '证件号',
            field: 'idNo'
        }, {
            title: '手机号码',
            field: 'mobile',
            render: (v, data) => {
                return data.user && data.user.mobile;
            }
        }, {
            title: '代偿金额',
            field: 'restReplaceRepayAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'restOverdueAmount',
            amount: true
        }, {
            title: '剩余银行欠款',
            field: 'restAmount',
            amount: true
        }, {
            title: '申请时间',
            field: 'time',
            render: (v, d) => {
                if (d.judgeList[0]) {
                    return formatDate(d.judgeList[0].caseStartDatetime);
                }
            }
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520,
            searchParams: {
                curNodeCodeList: ['021_10', '021_11', '021_12', '021_13', '021_14', '021_15', '021_16']
            },
            btnEvent: {
                litigation: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_10') {
                        showWarnMsg('当前节点不是司法诉讼节点');
                    } else {
                        this.props.history.push(`/biz/litigation/litigation?code=${selectedRowKeys[0]}&bizCode=${selectedRows[0].budgetOrder.code}`);
                    }
                },
                // continue: (selectedRowKeys, selectedRows) => {
                //     if (!selectedRowKeys.length) {
                //         showWarnMsg('请选择记录');
                //     } else if (selectedRowKeys.length > 1) {
                //         showWarnMsg('请选择一条记录');
                //     } else if (selectedRows[0].curNodeCode !== '021_11') {
                //         showWarnMsg('当前节点不是司法诉讼节点');
                //     } else {
                //         this.props.history.push(`/biz/litigation/continue?code=${selectedRowKeys[0]}`);
                //     }
                // },
                enter: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_13') {
                        showWarnMsg('当前节点不是诉讼结果录入节点');
                    } else {
                        this.props.history.push(`/biz/litigation/enter?code=${selectedRowKeys[0]}`);
                    }
                },
                finance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_11') {
                        showWarnMsg('当前节点不是诉讼结果录入节点');
                    } else {
                        this.props.history.push(`/biz/litigation/finance?code=${selectedRowKeys[0]}`);
                    }
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_15') {
                        showWarnMsg('当前节点不是财务确认收款节点');
                    } else {
                        this.props.history.push(`/biz/litigation/certain?code=${selectedRowKeys[0]}`);
                    }
                },
                again: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if(item[0].curNodeCode !== '021_14') {
                        showWarnMsg('当前节点不是重新申请执行节点');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定重新执行？',
                            onOk: () => {
                                this.props.doFetching();
                                return litigationAgain(key[0]).then(() => {
                                    this.props.cancelFetching();
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

export default litigation;