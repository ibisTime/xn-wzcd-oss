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
            title: '类型',
            field: 'backAdvanceFundType',
            type: 'select',
            key: 'back_advance_fund_type'
        }, {
            title: '当前节点',
            field: 'backAdvanceFundNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
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
              finance: (selectedRowKeys, selectedRows) => {
                  if (!selectedRowKeys.length) {
                      showWarnMsg('请选择记录');
                  } else if (selectedRowKeys.length > 1) {
                      showWarnMsg('请选择一条记录');
                  } else if (selectedRows[0].backAdvanceFundNodeCode !== '014_02') {
                      showWarnMsg('当前节点不是诉讼结果录入节点');
                  } else {
                      this.props.history.push(`/loanstools/take/finance?code=${selectedRowKeys[0]}`);
                  }
              }
            }
        });
    }
}

export default take;
