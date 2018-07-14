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
    done
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
            field: 'pledgeContractCode',
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
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            options: {
                singleSelect: false
            },
            searchParams: {
              roleCode: getRoleCode(),
              curNodeCodeList: ['008_01', '008_02', '008_03', '008_04', '008_05', '009_01', '009_02', '009_03', '009_04', '009_05', '009_06']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/mortgage/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                done: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].status === '1') {
                        showWarnMsg('该状态不可抵押');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '抵押完成？',
                            onOk: () => {
                                this.props.doFetching();
                                return done(key[0]).then(() => {
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

export default Mortgage;