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
} from '@redux/basis/provinceNum';
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
        ...state.basisProvinceNum,
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
class ProvinceNum extends React.Component {
    render() {
        const fields = [{
            title: '省份编号',
            field: 'provinceNo',
            search: true
        }, {
            title: '省份名称',
            field: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632025,
            rowKey: 'id',
            deleteCode: 632021
        });
    }
}

export default ProvinceNum;