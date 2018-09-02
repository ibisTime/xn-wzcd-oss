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
} from '@redux/biz/litigation/litigation';
import {
    listWrapper
} from 'common/js/build-list';
import {
  showWarnMsg,
  showSucMsg,
  formatDate,
  moneyFormat
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
                if(d.budgetOrder) {
                    return d.budgetOrder.code;
                }
            },
            search: true
        }, {
            title: '客户姓名',
            field: 'realName'
        }, {
            title: '原告',
            field: 'plaintiff',
            render: (v, d) => {
                if(d.judge) {
                    return d.judge.plaintiff;
                }
            }
        }, {
            title: '被告',
            field: 'defendant',
            render: (v, d) => {
                if(d.judge) {
                    return d.judge.defendant;
                }
            }
        }, {
            title: '案款',
            field: 'caseFee',
            render: (v, d) => {
                if(d.judge) {
                    return moneyFormat(d.judge.caseFee);
                }
            }
        }, {
            title: '受理时间',
            field: 'acceptanceTime',
            render: (v, d) => {
                if(d.judge) {
                    return formatDate(d.judge.acceptanceTime);
                }
            }
        }, {
            title: '受理费',
            field: 'acceptanceFee',
            render: (v, d) => {
                if(d.judge) {
                    return moneyFormat(d.judge.acceptanceFee);
                }
            }
        }, {
            title: '受理案号',
            field: 'caseNumber',
            render: (v, d) => {
                if(d.judge) {
                    return d.judge.caseNumber;
                }
            }
        }, {
            title: '经办法官',
            field: 'handleJudge',
            render: (v, d) => {
                if(d.judge) {
                    return d.judge.handleJudge;
                }
            }
        }, {
            title: '传票等送达日期',
            field: 'summonsDeliveryTime',
            render: (v, d) => {
                if(d.judge) {
                    return formatDate(d.judge.summonsDeliveryTime);
                }
            }
        }, {
            title: '开庭日期',
            field: 'courtDatetime',
            render: (v, d) => {
                if(d.judge) {
                    return formatDate(d.judge.courtDatetime);
                }
            }
        }, {
            title: '开庭地点',
            field: 'courtAddress',
            render: (v, d) => {
                if(d.judge) {
                    return d.judge.courtAddress;
                }
            }
        }, {
            title: '判决书送达时间',
            field: 'judgePdfDeliveryTime',
            render: (v, d) => {
                if(d.judge) {
                    return formatDate(d.judge.judgePdfDeliveryTime);
                }
            }
        }, {
            title: '生效时间',
            field: 'effectiveTime',
            render: (v, d) => {
                if(d.judge) {
                    return formatDate(d.judge.effectiveTime);
                }
            }
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '备注',
            field: 'remark',
            render: (v, d) => {
                if(d.judge) {
                    return d.judge.remark;
                }
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520,
            searchParams: {
                curNodeCodeList: ['021_09', '021_10', '021_11', '021_12', '021_13', '021_14', '021_15']
            },
            btnEvent: {
                litigation: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_09') {
                        showWarnMsg('当前节点不是司法诉讼');
                    } else {
                        this.props.history.push(`/biz/litigation/litigation?code=${selectedRowKeys[0]}&bizCode=${selectedRows[0].budgetOrder.code}`);
                    }
                },
                acceptance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_10') {
                        showWarnMsg('当前节点不是案件受理');
                    } else {
                        this.props.history.push(`/biz/litigation/acceptance?code=${selectedRowKeys[0]}`);
                    }
                },
                finance: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_11') {
                        showWarnMsg('当前节点不是财务审核');
                    } else {
                        this.props.history.push(`/biz/litigation/finance?code=${selectedRowKeys[0]}`);
                    }
                },
                cashier: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_12') {
                        showWarnMsg('当前节点不是出纳打款');
                    } else {
                        this.props.history.push(`/biz/litigation/cashier?code=${selectedRowKeys[0]}`);
                    }
                },
                service: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_13') {
                        showWarnMsg('当前节点不是送达');
                    } else {
                        this.props.history.push(`/biz/litigation/service?code=${selectedRowKeys[0]}`);
                    }
                },
                judgment: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_14') {
                        showWarnMsg('当前节点不是判决');
                    } else {
                        this.props.history.push(`/biz/litigation/judgment?code=${selectedRowKeys[0]}`);
                    }
                },
                takeEffect: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '021_15' && selectedRows[0].curNodeCode !== '021_17') {
                        showWarnMsg('当前节点不是生效');
                    } else {
                        this.props.history.push(`/biz/litigation/takeEffect?code=${selectedRowKeys[0]}`);
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