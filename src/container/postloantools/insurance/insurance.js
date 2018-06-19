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
} from '@redux/postloantools/insurance';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    sendMessage
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.postloantoolsInsurance,
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
class Insurance extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '身份证',
            field: 'idNo'
        }, {
            title: '保险到期时间',
            field: '22',
            type: 'date'
        }, {
            title: '备注',
            field: '33'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            btnEvent: {
                message: (key, item) => {
                  if (!key || !key.length || !item || !item.length) {
                    showWarnMsg('请选择记录');
                  } else {
                    Modal.confirm({
                      okText: '确认',
                      cancelText: '取消',
                      content: '确定发送？',
                      onOk: () => {
                        this.props.doFetching();
                        return sendMessage(key[0]).then(() => {
                          this.props.cancelFetching();
                          showWarnMsg('操作成功');
                        }).catch(() => {
                          this.props.cancelFetching();
                        });
                      }
                    });
                  }
                },
                continue: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/postloantools/insurance/continue?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Insurance;
