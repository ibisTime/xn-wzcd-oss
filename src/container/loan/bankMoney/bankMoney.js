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
} from '@redux/loan/bankMoney';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    showSucMsg,
    getRoleCode,
    dateTimeFormat
} from 'common/js/util';
import {
    Button,
    Upload,
    Modal
} from 'antd';
import {
    bankComplete
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanBankMoney,
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
class BankMoney extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyName',
            required: true
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            search: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '放款日期',
            field: 'bankFkDatetime',
            type: 'date',
            nowrap: true
        }, {
            title: '收款银行',
            field: 'bankReceiptName'
        }, {
            title: '收款账号',
            field: 'bankReceiptNumber',
            nowrap: true
        }, {
            title: '当前节点',
            field: 'curNodeCode',
            type: 'select',
            listCode: 630147,
            keyName: 'code',
            valueName: 'name',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            singleSelect: false,
            searchParams: {
                roleCode: getRoleCode(),
                curNodeCodeList: ['005_05', '007_01A', '007_01B', '007_02', '007_03', '007_04', '007_05', '007_06', '007_07', '007_08', '007_09']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/bankMoney/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                receive: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/bankMoney/receive?code=${selectedRowKeys[0]}`);
                    }
                },
                sendList: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let list = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            list.push(selectedRows[i].code);
                        }
                        this.props.history.push(`/loan/bankMoney/sendList?code=${list}`);
                    }
                },
                complete: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].curNodeCode !== '007_04') {
                        showWarnMsg('当前节点不是理件完成节点');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定理件完成？',
                            onOk: () => {
                                this.props.doFetching();
                                let list = [];
                                for(let i = 0, len = item.length; i < len; i++) {
                                    list.push(item[i].code);
                                }
                                return bankComplete(list).then(() => {
                                    showWarnMsg('操作成功');
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

export default BankMoney;
