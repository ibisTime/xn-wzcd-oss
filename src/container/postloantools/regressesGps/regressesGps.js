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
} from '@redux/postloantools/regressesGps';
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
        ...state.postloantoolsRegressesGps,
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
class RegressesGps extends React.Component {
    render() {
        const fields = [{
            title: '申领类型',
            field: 'type',
            type: 'select',
            data: [{
                key: '1',
                value: '公司'
            }, {
                key: '2',
                value: '个人'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '所属公司',
            field: 'companyName'
        }, {
            title: '申领人',
            field: 'applyUserName'
        }, {
            title: '申领时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '申领个数',
            field: 'applyCount'
        }, {
            title: '发货时间',
            field: 'sendDatetime',
            type: 'date'
        }, {
            title: '收货时间',
            field: 'receiveDatetime',
            type: 'date'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'gps_apply_status',
            search: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632715,
            btnEvent: {
                companyCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/regresses/apply?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default RegressesGps;
