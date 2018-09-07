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
} from '@redux/administrative/gpsSupplier';
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
        ...state.administrativeGpsSupplier,
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
class gpsSupplier extends React.Component {
    render() {
        const fields = [{
            title: '名称',
            field: 'name',
            search: true
        }, {
            title: '联系人',
            field: 'contacts'
        }, {
            title: '联系人手机号',
            field: 'contactsMobile'
        }, {
            title: '地址',
            field: 'address'
        }, {
            title: '备注',
            field: 'remark'
        }, {
            title: '最新修改人',
            field: 'updaterName'
        }, {
            title: '最新修改时间',
            field: 'updateDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632785
        });
    }
}

export default gpsSupplier;
