import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/loanPercent-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisLoanPercentAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class loanPercentAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '类型',
            field: 'companyCode',
            type: 'select',
            key: ''
        }, {
            title: '最低贷款成数',
            field: 'bankName'
        }, {
            title: '最高贷款成数',
            field: 'subbranch'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 632002,
            detailCode: 632006,
            beforeSubmit: (param) => {
                let data = this.props.selectData;
                let len = data.bankCode.length;
                for(var i = 0; i < len; i++) {
                    if(param.bankCode === data.bankCode[i].bankCode) {
                        param.bankName = data.bankCode[i].bankName;
                    }
                }
                return param;
            }
        });
    }
}

export default loanPercentAddedit;