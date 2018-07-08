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
} from '@redux/loan/moneyCheck';
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
    makeAllbill
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanMoneyCheck,
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
class MoneyCheck extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'bizCompanyName',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            search: true
        }, {
            title: '用款小写',
            field: 'useAmount',
            amount: true
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '收款银行账号',
            field: 'collectionAccountNo'
        }, {
            title: '收款银行',
            field: 'bankReceiptName',
            noVisible: true
        }, {
            title: '打款日期',
            field: 'advanceFundDatetime',
            type: 'date'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '申请日期',
            field: 'updateDatetime',
            type: 'date'
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
            pageCode: 632185,
            searchParams: {
              roleCode: getRoleCode(),
              curNodeCodeList: ['003_04', '003_05', '003_07', '004_04', '004_05', '004_06', '004_08']
            },
            btnEvent: {
                compBill: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/loan/moneyCheck/compBill`);
                },
                payCar: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].curNodeCode !== '003_05') {
                        showWarnMsg('当前节点不是省分经理审核');
                    } else {
                        this.props.history.push(`/loan/moneyCheck/payCar?code=${selectedRowKeys[0]}`);
                    }
                },
                payComp: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/loan/moneyCheck/payComp`);
                },
                allBill: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].curNodeCode !== '003_04') {
                        showWarnMsg('不是总公司制单节点');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定制单？',
                            onOk: () => {
                                this.props.doFetching();
                                return makeAllbill(key[0]).then(() => {
                                    this.props.getPageData();
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

export default MoneyCheck;