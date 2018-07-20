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
} from '@redux/analysis/schedule';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    formatDate
} from 'common/js/util';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.analysisSchedule,
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
class Balancedetail extends React.Component {
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'name',
            render: (v, d) => {
                if(d.user !== undefined) {
                    return d.user.realName;
                }
            },
            search: true
        }, {
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '借款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '借款余额',
            field: 'loanBalance',
            amount: true
        }, {
            title: '代偿金额',
            field: 'loanBalance',
            amount: true
        }, {
            title: '其他欠款',
            field: 'restTotalCost',
            amount: true
        }, {
            title: '逾期日期',
            field: 'updater',
            render: (v, d) => {
                if(d.loanOrder !== undefined) {
                    return formatDate(d.loanOrder.fkDatetime);
                }
            }
        }, {
            title: '电话清收',
            field: 'restTotalCost'
        }, {
            title: '上门清收',
            field: 'restTotalCost'
        }, {
            title: '定位寻车',
            field: 'monthDatetime',
            type: 'date'
        }, {
            title: '车辆入库',
            field: 'monthAmount',
            amount: true
        }, {
            title: '法院诉讼',
            field: 'overdueAmount',
            amount: true
        }, {
            title: '法院判决',
            field: 'overdueAmount'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630520
        });
    }
}

export default Balancedetail;