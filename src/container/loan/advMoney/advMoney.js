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
} from '@redux/loan/advMoney';
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
    done
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanAdvMoney,
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
class AdvMoney extends React.Component {
    render() {
        const fields = [{
            title: '业务编号',
            field: 'code',
            search: true
        }, {
            title: '业务公司',
            field: 'companyCode',
            listCode: 630106,
            params: {
                typeList: [1]
            },
            type: 'select',
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '贷款银行',
            field: 'loanBankCode',
            type: 'select',
            listCode: 632037,
            keyName: 'bankCode',
            valueName: 'bankName',
            search: true
        }, {
            title: '用款小写',
            field: 'loanAmount',
            amount: true
        }, {
            title: '是否垫资',
            filed: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '0',
                value: '是'
            }, {
                key: '1',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '收款单位名称',
            filed: '1'
        }, {
            title: '收款银行账号',
            field: 'bankReceiptNumber'
        }, {
            title: '收款银行',
            field: 'bankReceiptName'
        }, {
            title: '打款日期',
            field: '2',
            type: 'date'
        }, {
            title: '汽车经销商',
            field: 'carDealerName'
        }, {
            title: '申请人',
            field: '3'
        }, {
            title: '申请日期',
            field: '4',
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
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/advMoney/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                areaCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/advMoney/areaCheck?code=${selectedRowKeys[0]}`);
                    }
                },
                compCheck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/advMoney/compCheck?code=${selectedRowKeys[0]}`);
                    }
                },
                revoke: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/loan/advMoney/revoke?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default AdvMoney;