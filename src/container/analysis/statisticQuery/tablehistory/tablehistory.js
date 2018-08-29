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
} from '@redux/analysis/tablehistory';
import {
    listWrapper
} from 'common/js/build-list';
import {
    dateFormat
} from 'common/js/util';
import {
    lowerFrame,
    onShelf
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.analysisTablehistory,
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
class Tablehistory extends React.Component {
    render() {
        const fields = [{
            title: '表格类型',
            field: 'menuName',
            search: true
        }, {
            title: '导出人',
            field: 'realName',
            search: true
        }, {
            title: '导出时间',
            field: 'updateDatetime',
            rangedate: ['updateDatetimeStart', 'updateDatetimeEnd'],
            type: 'date',
            render: dateFormat,
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632095
        });
    }
}

export default Tablehistory;