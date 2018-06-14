import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/bank-addedit';
import {
    getQueryString
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisBankAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class bankAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '贷款银行',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: '{{bankName.DATA}}',
            required: true
        }, {
            title: '支行',
            field: 'subbranch',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632030,
            editCode: 632032,
            detailCode: 632036,
            beforeSubmit: (param) => {
                let bank = this.props.selectData.bankCode.find(v => v.bankCode === param.bankCode);
                param.bankName = bank.bankName;
                return param;
            }
        });
    }
}

export default bankAddedit;
