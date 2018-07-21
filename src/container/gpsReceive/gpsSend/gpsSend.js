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
} from '@redux/gpsReceive/gpsSend';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.gpsReceiveGpsSend,
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
class GpsSend extends React.Component {
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
            key: 'logistics_status',
            search: true
        }, {
            title: '发货说明',
            field: 'sendNote'
        }, {
            title: '补件原因',
            field: 'supplementReason'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            singleSelect: false,
            searchParams: {
                type: '2'
            },
            btnEvent: {
              send: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else {
                    for(let i = 0, len = selectedRows.length; i < len; i++) {
                        if(selectedRows[i].status !== '0') {
                            showWarnMsg('当前不是待发件的状态');
                            return;
                        }
                    }
                  this.props.history.push(`/gpsReceive/gpsSend/send?code=${selectedRowKeys[0]}&n=${selectedRows[0].userName}`);
                }
              },
              repair: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '3') {
                  showWarnMsg('当前不是待补件状态');
                } else {
                  this.props.history.push(`/gpsReceive/gpsSend/repair?code=${selectedRowKeys[0]}&n=${selectedRows[0].userName}`);
                }
              }
            }
        });
    }
}

export default GpsSend;
