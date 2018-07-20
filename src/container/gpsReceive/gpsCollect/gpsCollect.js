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
} from '@redux/gpsReceive/gpsCollect';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    putaway,
    soldOut
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.dataReceiveGpsCollect,
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
class GpsCollect extends React.Component {
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'userName',
            search: true
        }, {
            title: '传递方式',
            field: 'sendType',
            type: 'select',
            data: [{
                key: '1',
                value: '线下'
            }, {
                key: '2',
                value: '快递'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '快递公司',
            field: 'logisticsCompany',
            type: 'select',
            key: 'kd_company'
        }, {
            title: '单号',
            field: 'logisticsCode'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'logistics_status'
        }, {
            title: '发货说明',
            field: 'sendNote'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            searchParams: {
                type: '2',
                status: '1'
            },
            btnEvent: {
                collect: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是待收件状态');
                    } else {
                        this.props.history.push(`/gpsReceive/gpsCollect/collect?code=${selectedRowKeys[0]}`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是待收件状态');
                    } else {
                        this.props.history.push(`/gpsReceive/gpsCollect/check?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default GpsCollect;