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
    dataCollect
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
    constructor(props) {
        super(props);
        this.codeList = [];
    }
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
            key: 'logistics_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632155,
            singleSelect: false,
            searchParams: {
                typeList: ['1', '3']
            },
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '2') {
                        showWarnMsg('不是待审核状态');
                    } else {
                        this.props.history.push(`/dataReceive/dataCollect/check?code=${selectedRowKeys[0]}`);
                    }
                },
                collect: (key, item) => {
                  if (!key || !key.length || !item || !item.length) {
                    showWarnMsg('请选择记录');
                  } else {
                    for(let i = 0, len = item.length; i < len; i++) {
                        if(item[i].status !== '1') {
                            showWarnMsg('不是待收件状态');
                            this.codeList = [];
                            return;
                        }
                        this.codeList.push(item[i].code);
                    }
                    Modal.confirm({
                      okText: '确认',
                      cancelText: '取消',
                      content: '确定收件？',
                      onOk: () => {
                        this.props.doFetching();
                        return dataCollect(this.codeList).then(() => {
                            showSucMsg('操作成功');
                          setTimeout(() => {
                              this.props.getPageData();
                          }, 500);
                        }).catch(() => {
                          this.props.cancelFetching();
                        });
                      }
                    });
                  }
                }
            }
        });
    }
}

export default DataCollect;