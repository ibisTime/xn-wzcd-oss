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
} from '@redux/basis/idCardArea';
import {
    showWarnMsg,
    showSucMsg
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
        ...state.basisIdCardArea,
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
class IdCardArea extends React.Component {
    render() {
        const fields = [{
            title: '身份证区域号',
            field: 'areaNo',
            search: true
        }, {
            title: '身份证区域名称',
            field: 'areaName',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632015,
            rowKey: 'id',
            deleteCode: 632011
        });
    }
}

export default IdCardArea;