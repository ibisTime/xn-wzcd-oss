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
} from '@redux/biz/summary/summary';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat,
    getUserId,
    moneyFormat,
    dateFormat
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    lowerFrame,
    onShelf
} from 'api/biz';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.summary,
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
class Summary extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            render: (v, d) => {
                return d.budgetOrder.code;
            },
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            type: 'select',
            listCode: 630106,
            params: {
                typeList: ['1']
            },
            keyName: 'code',
            valueName: 'name',
            search: true,
            noVisible: true
        }, {
            title: '银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: 'fullName',
            search: true,
            noVisible: true
        }, {
            title: '业务区域',
            field: 'businessArea',
            type: 'citySelect',
            search: true,
            noVisible: true
        }, {
            title: '客户姓名',
            field: 'realName',
            render: (v, d) => {
                return d.user.realName;
            },
            search: true
        }, {
            title: '电话',
            field: 'idNo1',
            render: (v, d) => {
                return d.user.mobile;
            }
        }, {
            title: '证件号',
            field: 'idNo',
            render: (v, d) => {
                return <span style={{whiteSpace: 'nowrap'}}>{d.user.idNo}</span>;
            }
        }, {
            title: '车牌号',
            field: 'carNumber',
            render: (v, d) => {
                return d.budgetOrder.carNumber;
            }
        }, {
            title: '放款日期',
            field: 'bankFkDatetime',
            type: 'date'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '剩余欠款',
            field: 'restAmount',
            amount: true
        }, {
            title: '逾期日期',
            field: 'repayDatetime',
            render: (v, d) => {
                if(d.overdueRepayPlan) {
                    return dateFormat(d.overdueRepayPlan.repayDatetime);
                }
            }
        }, {
            title: '月还款额',
            field: 'monthAmount',
            amount: true
        }, {
            title: '逾期金额',
            field: 'restOverdueAmount',
            amount: true
        }, {
            title: '实际逾期期数',
            field: 'curOverdueCount',
            search: true
        }, {
            title: '累计代偿次数',
            field: 'totalReplaceRepayCount'
        }, {
            title: '账单日',
            field: 'billDatetime'
        }, {
            title: '还款日',
            field: 'monthDatetime'
        }, {
            title: '总期数',
            field: 'periods'
        }, {
            title: '剩余期数',
            field: 'restPeriods'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630523,
            btnEvent: {
              plan: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/biz/summary/plan?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default Summary;
