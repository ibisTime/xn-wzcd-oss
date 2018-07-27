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
} from '@redux/finance/rebate';
import {
    listWrapper
} from 'common/js/build-list';
import {
    showWarnMsg,
    dateTimeFormat,
    getRoleCode
} from 'common/js/util';
import {
    Modal
} from 'antd';
import {
    rebateList
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.financeRebate,
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
class Rebate extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '业务编号',
            search: true
        }, {
            field: 'companyName',
            title: '业务公司',
            search: true
        }, {
            field: 'customerName',
            title: '客户姓名',
            search: true
        }, {
            title: '身份证号',
            field: 'idNo'
        }, {
            field: 'carDealerName',
            title: '汽车经销商',
            search: true
        }, {
            field: 'loanAmount',
            title: '贷款金额',
            amount: true
        }, {
            field: 'bankRate',
            title: '银行利率',
            return: (v, d) => {
                return (d.bankRate * 100).toFixed(4) + '%';
            }
        }, {
            title: '手续费',
            field: 'fee',
            amount: true
        }, {
            title: '类型',
            field: 'bankRepointStatus',
            type: 'select',
            key: 'bank_repoint_status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            singleSelect: false,
            searchParams: {
                bankRepointPage: '1'
            },
            btnEvent: {
                apply: (key, item) => {
                    if (!key || !key.length || !item || !item.length) {
                        showWarnMsg('请选择记录');
                    } else if (item[0].bankRepointStatus !== '0') {
                        showWarnMsg('该状态不是未返点');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定已返点？',
                            onOk: () => {
                                this.props.doFetching();
                                let list = [];
                                for(let i = 0, len = item.length; i < len; i++) {
                                    list.push(item[i].code);
                                }
                                return rebateList(list).then(() => {
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

export default Rebate;