import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/takeFree-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.loanstoolsTakeFreeAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class TakeFreeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            select: true
        }, {
            title: '业务编号',
            field: 'code'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName'
        }, {
            title: '应收金额',
            field: 'receiptAccount',
            amount: true
        }, {
            title: '实收金额',
            field: 'receiptAccount2',
            amount: true
        }, {
            title: '未收金额',
            field: 'receiptAccount3',
            amount: true
        }, {
            title: '是够结清',
            field: 'receiptAccount4'
        }, {
            title: '服务费清单',
            field: 'receiptAccount5'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}

export default TakeFreeAddedit;