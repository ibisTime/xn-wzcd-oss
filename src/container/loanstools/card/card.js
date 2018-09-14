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
} from '@redux/loanstools/card';
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
    listWrapper
} from 'common/js/build-list';
import {
    lowerFrame,
    onShelf,
    sendMsg
} from 'api/biz';

@listWrapper(
    state => ({
        ...state.loanstoolsCard,
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
class card extends React.Component {
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
            title: '银行卡号',
            field: 'bankCardNumber',
            search: true
        }, {
            title: '制卡银行',
            field: 'loanBankName'
        }, {
            title: '状态',
            field: 'makeCardStatus',
            type: 'select',
            key: 'make_card_status',
            search: true
        }, {
            title: '更新人',
            field: 'makeCardOperatorName'
        }, {
            title: '备注',
            field: 'makeCardRemark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            searchParams: {
                makeCardStatusList: ['0', '1', '2', '3']
            },
            btnEvent: {
                apply: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].makeCardStatus !== '0') {
                        showWarnMsg('该状态不是待制卡的状态');
                    } else {
                        this.props.history.push(`/loanstools/card/apply?code=${selectedRowKeys[0]}`);
                    }
                },
                entering: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].makeCardStatus !== '2') {
                        showWarnMsg('该状态不是待回录的状态');
                    } else {
                        this.props.history.push(`/loanstools/card/enter?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default card;