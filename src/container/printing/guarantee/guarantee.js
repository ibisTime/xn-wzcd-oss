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
} from '@redux/printing/guarantee';
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
        ...state.printingGuarantee,
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
class Guarantee extends React.Component {
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
            title: '贷款银行',
            field: 'loanbankName'
        }, {
            title: '贷款金额',
            field: 'loanAmount'
        }, {
            title: '利率',
            field: '11'
        }, {
            title: '服务费',
            field: 'fee'
        }, {
            title: '品牌型号',
            field: '22'
        }, {
            title: '打件日期',
            field: '44',
            type: 'date'
        }, {
            title: '打件人',
            field: '33'
        }, {
            title: '业务员名称',
            field: 'saleUserName'
        }];
        return this.props.buildList({
            fields,
            pageCode: 632145,
            btnEvent: {
                make: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/printing/guarantee/make?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Guarantee;