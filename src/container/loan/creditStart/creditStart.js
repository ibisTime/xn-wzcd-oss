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
} from '@redux/loan/creditStart';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat
} from 'common/js/util';
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
        ...state.loanCreditStart,
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
class CreditStart extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code'
        }, {
            title: '业务公司',
            field: 'companyName'
        }, {
            title: '客户姓名',
            field: 'userName',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.userName : '-');
            }
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '手机号',
            field: 'mobile',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.mobile : '-');
            }
        }, {
            title: '身份证号',
            field: 'idNo',
            render: (e, t) => {
                return (t.creditUser ? t.creditUser.idNo : '-');
            }
        }, {
            title: '业务员',
            field: 'salesmanName'
        }, {
            title: '申请日期',
            field: 'applyDatetime',
            type: 'date',
            rangedate: ['applyDatetimeStart', 'applyDatetimeEnd'],
            render: dateTimeFormat,
            search: true
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
            pageCode: 632115,
            searchParams: {
                roleCode: getRoleCode(),
                curNodeCode: ['001_01', '001_02', '001_03', '001_04', '001_05', '001_06']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    let code = selectedRowKeys ? selectedRowKeys[0] : '';
                    if (code) {
                        if (selectedRows[0].curNodeCode !== '001_01' && selectedRows[0].curNodeCode !== '001_05') {
                            showWarnMsg('当前不是填写征信单或重新上传征信资料的节点');
                            return;
                        }
                        this.props.history.push(`/loan/creditStart/addedit?isAddedit=1&code=${code}&curNodeCode=${selectedRows[0].curNodeCode}`);
                    } else {
                        this.props.history.push(`/loan/creditStart/addedit?isAddedit=1`);
                    }
                },
                checkSalesman: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '001_03') {
                        showWarnMsg('当前不是征信初审的节点');
                    } else {
                        this.props.history.push(`/loan/creditStart/addedit?v=1&isCheckSalesman=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default CreditStart;