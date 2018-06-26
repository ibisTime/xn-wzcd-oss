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
} from '@redux/postloantools/compensatory';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode
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
        ...state.postloantoolsCompensatory,
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
class compensatory extends React.Component {
    render() {
        const fields = [{
            title: '预算单号',
            field: 'budgetCode'
        }, {
            title: '业务编号',
            field: 'bizCode',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerUserName'
        }, {
            title: '证件号',
            field: 'idNo'
        }, {
            title: '代偿性质',
            field: 'type',
            type: 'select',
            key: 'replace_repay_type',
            search: true
        }, {
            title: '预算金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '月还款额',
            field: 'monthLoanAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'overdueAmount',
            amount: true
        }, {
            title: '剩余垫资金额',
            field: 'dzAmount',
            amount: true
        }, {
            title: '累计逾期次数',
            field: 'periods'
        }, {
            title: '实际预期次数',
            field: 'periods1'
        }, {
            title: '累计代偿次数',
            field: 'periods2'
        }, {
            title: '实际代偿次数',
            field: 'periods3'
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632336,
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    // if (!selectedRowKeys.length) {
                    //     showWarnMsg('请选择记录');
                    // } else if (selectedRowKeys.length > 1) {
                    //     showWarnMsg('请选择一条记录');
                    // } else {
                        this.props.history.push(`/postloantools/compensatory/check?code=${selectedRowKeys[0]}`);
                    // }
                },
                certain: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/compensatory/certain?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default compensatory;