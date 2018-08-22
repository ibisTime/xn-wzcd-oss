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
} from '@redux/analysis/bonuses';
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
        ...state.analysisBonuses,
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
class Bonuses extends React.Component {
    render() {
        const fields = [{
            title: '月份',
            field: 'month'
        }, {
            title: '提成单价',
            field: 'unitPrice',
            amount: true,
            required: true
        }, {
            title: '本月比例',
            field: 'monthRate',
            number: true,
            required: true
        }, {
            title: '留存月数',
            field: 'retainMonths',
            'Z+': true,
            required: true
        }, {
            title: '起始金额',
            field: 'startAmount',
            amount: true,
            required: true
        }, {
            title: '结束金额',
            field: 'endAmount',
            amount: true,
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630902
        });
    }
}

export default Bonuses;