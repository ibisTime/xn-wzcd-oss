import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/misInvoice-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsMisInvoiceAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class MisInvoiceAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName'
          }, {
            title: '业务编号',
            field: 'code'
          }, {
            title: '身份证',
            field: 'inNo'
          }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true
          }, {
            title: '贷款银行',
            field: 'loanBankName'
          }, {
            title: '征信结果',
            field: '33'
          }, {
            title: '预算单',
            field: '44'
          }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}

export default MisInvoiceAddedit;
