import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/loanstools/refund-addedit';
import {
    getQueryString
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanstoolsRefundAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class RefundAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '客户姓名',
            field: 'companyCode'
        }, {
            title: '业务编号',
            field: 'receiptBank'
        }, {
            title: '身份证',
            field: 'receiptAccount'
        }, {
            title: '贷款金额',
            field: 'receiptAccount',
            amount: true
        }, {
            title: '贷款银行',
            field: 'receiptAccount'
        }, {
            title: '征信结果',
            field: 'receiptAccount'
        }, {
            title: '预算单',
            field: 'receiptAccount'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}

export default RefundAddedit;
