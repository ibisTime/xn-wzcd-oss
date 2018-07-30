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
            title: 'GPS编号',
            field: 'gpsDevNo'
        }, {
            title: '归属公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '公司领用状态',
            field: 'companyApplyStatus',
            type: 'select',
            data: [{
                key: '0',
                value: '待申领'
            }, {
                key: '1',
                value: '已申领'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '公司领用日期',
            field: 'companyApplyDatetime',
            type: 'date'
        }, {
            title: 'GPS领用人',
            field: 'applyUserName'
        }, {
            title: 'GPS领用状态',
            field: 'applyStatus',
            type: 'select',
            data: [{
                key: '0',
                value: '待申领'
            }, {
                key: '1',
                value: '申领处理中'
            }, {
                key: '2',
                value: '已申领'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '领用日期',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: 'GPS使用状态',
            field: 'useStatus',
            type: 'select',
            data: [{
                key: '1',
                value: '已使用'
            }, {
                key: '0',
                value: '未使用'
            }, {
                key: '2',
                value: '已损坏'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '使用日期',
            field: 'useDatetime',
            type: 'datetime'
        }, {
            title: '业务编号',
            field: 'bizCode'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632705,
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