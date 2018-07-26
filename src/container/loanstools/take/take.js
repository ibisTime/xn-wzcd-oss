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
  dateTimeFormat,
  dateFormat
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
            render: dateFormat,
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
            searchParams: {
              backAdvanceFundPage: 1
            },
            btnEvent: {
              entering: (selectedRowKeys, selectedRows) => {
                this.props.history.push(`/loanstools/take/enter`);
              },
              remind: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys || !selectedRowKeys.length || !selectedRows || !selectedRows.length) {
                  showWarnMsg('请选择记录');
                } else if (selectedRows[0].isSubmitCancel !== '0') {
                  showWarnMsg('当前业务已经提交作废申请');
                } else {
                  Modal.confirm({
                    okText: '确认',
                    cancelText: '取消',
                    content: '确定发送？',
                    onOk: () => {
                      this.props.doFetching();
                      return remind(selectedRowKeys[0]).then(() => {
                        this.props.cancelFetching();
                        showWarnMsg('操作成功');
                        setTimeout(() => {
                            this.props.getPageData();
                        }, 1000);
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
