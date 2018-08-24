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
            field: 'yearMonth',
            type: 'date'
        }, {
            title: '业务员',
            field: 'saleUserName'
        }, {
            title: '自主开发笔数',
            field: 'selfDevelopNumber'
        }, {
            title: '自主开发奖金',
            field: 'selfDevelopBonus',
            amount: true
        }, {
            title: '非自主开发笔数',
            field: 'notSelfDevelopNumber'
        }, {
            title: '非自主开发奖金',
            field: 'notSelfDevelopBonus',
            amount: true
        }, {
            title: '小计笔数',
            field: 'totalNumber'
        }, {
            title: '小计奖金',
            field: 'totalBonus',
            amount: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 630912
        });
    }
}

export default Bonuses;