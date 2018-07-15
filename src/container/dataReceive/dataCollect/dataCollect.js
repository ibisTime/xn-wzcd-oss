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
} from '@redux/dataReceive/dataCollect';
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
        ...state.dataReceiveDataCollect,
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
class DataCollect extends React.Component {
    render() {
        const fields = [{
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'logistics_type'
        }, {
            title: '客户姓名',
            field: 'customerName',
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
            title: '发件节点',
            field: 'fromNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '收件节点',
            field: 'toNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'logistics_status'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            searchParams: {
                type: '1'
            },
            btnEvent: {
              collect: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/dataReceive/dataCollect/collect?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default DataCollect;
