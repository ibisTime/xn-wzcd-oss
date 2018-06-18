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
} from '@redux/basis/receivables';
import {
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
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
        ...state.basisReceivables,
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
class Receivables extends React.Component {
    render() {
        const fields = [{
            title: '公司',
            field: 'companyCode',
            type: 'select',
            listCode: 630106,
            params: {
              typeList: [1],
              status: 1
            },
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '户名',
            field: 'keyword',
            search: true,
            render: (e, t) => {
                return t.realName;
            }
        }, {
            title: '银行名称',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName'
        }, {
            title: '开户支行',
            field: 'subbranch'
        }, {
            title: '银行卡号',
            field: 'bankcardNumber'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632005,
            deleteCode: 632001,
            searchParams: {
                type: '1'
            }
        });
    }
}

export default Receivables;
