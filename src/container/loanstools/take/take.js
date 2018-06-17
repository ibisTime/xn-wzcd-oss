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
} from '@redux/loanstools/take';
import {
  showWarnMsg,
  showSucMsg,
  dateTimeFormat
} from 'common/js/util';
import {
  Button,
  Upload,
  Modal
} from 'antd';
import {
    listWrapper
} from 'common/js/build-list';
import {
    remind
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanstoolsTake,
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
class take extends React.Component {
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
            title: '收款金额',
            field: 'zfSkAmount',
            amount: true
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '收款日期',
            field: 'zfSkReceiptDatetime',
            rangedate: ['zfSkReceiptDatetimeStart', 'zfSkReceiptDatetimeEnd'],
            type: 'date',
            render: dateTimeFormat,
            search: true
        }, {
            title: '是否提交作废申请',
            field: 'isSubmitCancel',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            btnEvent: {
              entering: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                  showWarnMsg('请选择一条记录');
                } else {
                  this.props.history.push(`/loanstools/take/enter?code=${selectedRowKeys[0]}`);
                }
              },
              remind: (key, item) => {
                if (!key || !key.length || !item || !item.length) {
                  showWarnMsg('请选择记录');
                } else {
                  Modal.confirm({
                    okText: '确认',
                    cancelText: '取消',
                    content: '确定发送？',
                    onOk: () => {
                      this.props.doFetching();
                      return remind(key[0]).then(() => {
                        this.props.cancelFetching();
                        showWarnMsg('操作成功');
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

export default take;