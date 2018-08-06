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
} from '@redux/loan/mortgage';
import {
    listWrapper
} from 'common/js/build-list';
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
    done,
    carComplete,
    mortgageStart
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanMortgage,
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
class Mortgage extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '合同编号',
            field: 'bankContractCode',
            hidden: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款期限(月)',
            field: 'loanPeriods'
        }, {
            title: '业务员名称',
            field: 'saleUserName'
        }, {
            title: '收款银行',
            field: 'bankReceiptName'
        }, {
            title: '当前节点',
            field: 'pledgeCurNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            singleSelect: false,
            searchParams: {
              roleCode: getRoleCode(),
              pledgeCurNodeCodeList: ['008_01', '008_02', '008_03', '008_04', '008_05', '008_06', '009_01', '009_02', '009_03', '009_04', '009_05', '009_06', '009_07', '009_08', '009_09', '009_10']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].pledgeCurNodeCode !== '008_04' && selectedRows[0].pledgeCurNodeCode !== '009_09') {
                        showWarnMsg('当前不是确认提交银行节点');
                    } else {
                        this.props.history.push(`/loan/mortgage/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                done: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].pledgeCurNodeCode === '009_04') {
                        this.props.history.push(`/loan/mortgage/done?code=${key[0]}`);
                    } else if (item[0].pledgeCurNodeCode !== '008_05') {
                        showWarnMsg('当前不是抵押完成节点');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '抵押完成？',
                            onOk: () => {
                                this.props.doFetching();
                                return done(key[0]).then(() => {
                                    this.props.getPageData();
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
                },
                complete: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].pledgeCurNodeCode !== '008_02' && item[0].pledgeCurNodeCode !== '009_07') {
                        showWarnMsg('当前节点不是理件完成节点');
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
                                return carComplete(list).then(() => {
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
                },
                begin: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].pledgeCurNodeCode !== '009_03') {
                        showWarnMsg('当前节点不是抵押开始');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '抵押开始？',
                            onOk: () => {
                                this.props.doFetching();
                                this.props.doFetching();
                                let list = [];
                                for(let i = 0, len = item.length; i < len; i++) {
                                    list.push(item[i].code);
                                }
                                return mortgageStart(list).then(() => {
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

export default Mortgage;