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
} from '@redux/loanarchives/archivesquery';
import {
    dateTimeFormat,
    showWarnMsg,
    getRoleCode
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
        ...state.loanarchivesArchivesquery,
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
class Archivesquery extends React.Component {
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
            required: true
        }, {
            title: '客户姓名',
            field: 'customerName',
            search: true
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '合同编号',
            field: 'bankContractCode'
        }, {
            title: '品牌型号',
            field: 'carBrand'
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '业务员名称',
            field: 'saleUserName'
        }, {
            title: '状态',
            field: 'enterFileStatus',
            type: 'select',
            key: 'enter_file_status'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632148,
            searchParams: {
              roleCode: getRoleCode(),
              enterFileStatusList: ['2']
            }
        });
    }
}

export default Archivesquery;