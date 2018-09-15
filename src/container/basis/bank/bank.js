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
} from '@redux/basis/bank';
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
        ...state.basisBank,
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
class Bank extends React.Component {
    render() {
        const fields = [{
            title: '银行编号',
            field: 'bankCode',
            search: true
        }, {
            title: '银行名称',
            field: 'bankName',
            search: true
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
            pageCode: 632035,
            deleteCode: 632031,
            btnEvent: {
                subbranch: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/basis/bank/subbranch?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Bank;
