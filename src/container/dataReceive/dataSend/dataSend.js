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
} from '@redux/dataReceive/dataSend';
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
        ...state.dataReceiveDataSend,
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
class DataSend extends React.Component {
    constructor(props) {
        super(props);
        this.list = [];
    }
    render() {
        const fields = [{
            title: '业务编号',
            field: 'bizCode',
            search: true
        }, {
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
            key: 'logistics_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            singleSelect: false,
            searchParams: {
                type: '1'
            },
            btnEvent: {
              send: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else {
                    for(let i = 0, len = selectedRows.length; i < len; i++) {
                        if(selectedRows[i].status !== '0') {
                            showWarnMsg('当前不是待发件的状态');
                            this.list = [];
                            return;
                        }
                        this.list.push(selectedRows[i].code);
                    }
                  this.props.history.push(`/dataReceive/dataSend/send?code=${this.list}`);
                }
              },
              repair: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else if (selectedRows[0].status !== '3') {
                  showWarnMsg('当前不是待发件的状态');
                } else {
                  this.props.history.push(`/dataReceive/dataSend/repair?code=${selectedRowKeys[0]}`);
                }
              }
            }
        });
    }
}

export default DataSend;
