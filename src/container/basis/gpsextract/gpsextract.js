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
} from '@redux/basis/gpsextract';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    lowerFrame,
    onShelf
} from 'api/biz';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.basisGpsextract,
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
class Gpsextract extends React.Component {
    render() {
        const fields = [{
            title: 'gps提成比例',
            field: 'cvalue'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 630047,
            searchParams: {
                key: 'budget_gps_deduct_rate'
            }
        });
    }
}

export default Gpsextract;