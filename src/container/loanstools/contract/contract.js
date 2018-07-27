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
} from '@redux/loanstools/contract';
import {
    showWarnMsg,
    showSucMsg
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
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanstoolsContract,
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
class contract extends React.Component {
    render() {
        const fields = [{
            title: '合同号',
            field: 'contractCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '身份证号',
            field: 'idNo'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '银行',
            field: 'bankName',
            search: true
        }, {
            title: '账单日',
            field: 'billDatetime',
            type: 'date'
        }, {
            title: '还款日',
            field: 'repayBankDate',
            type: 'date'
        }, {
            title: '信用卡号',
            field: 'bankCardNumber'
        }, {
            title: '合同签订日',
            field: 'contractSignDate',
            type: 'date'
        }, {
            title: '导入日期',
            field: 'importDatetime',
            type: 'date'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'contract_import_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632255,
            btnEvent: {
                import: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/loanstools/contract/import?code=${selectedRowKeys[0]}`);
                },
                dispose: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '2') {
                        showWarnMsg('不是不匹配状态');
                    } else {
                        this.props.history.push(`/loanstools/contract/dispose?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default contract;