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
} from '@redux/history/historyBusiness';
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
    sendMsg
} from 'api/biz';

@listWrapper(state => ({
    ...state.historyHistoryBusiness,
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
})
class HistoryBusiness extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName',
            render: (v, d) => {
                return d.budgetOrder.companyName;
            }
        }, {
            title: '客户姓名',
            field: 'realName',
            render: (v, d) => {
                return d.user.realName;
            },
            search: true
        }, {
            title: '身份证',
            field: 'idNo',
            render: (v, d) => {
                return <span style={{whiteSpace: 'nowrap'}}>{d.user.idNo}</span>;
            }
        }, {
            title: '贷款银行',
            field: 'loanBank',
            type: 'select',
            listCode: 632057,
            keyName: 'code',
            valueName: '{{bankName.DATA}}-{{fullName.DATA}}',
            search: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '总期数',
            field: 'periods'
        }, {
            title: '剩余期数',
            field: 'restPeriods'
        }, {
            title: '放款日期',
            field: 'fkDatetime',
            render: (v, d) => {
                return formatDate(d.budgetOrder.bankFkDatetime);
            }
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
            pageCode: 630520,
            searchParams: {
                curNodeCodeList: ['020_13']
            }
        });
    }
}

export default HistoryBusiness;