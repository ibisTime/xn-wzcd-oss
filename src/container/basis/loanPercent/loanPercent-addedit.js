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
            field: 'type',
            type: 'select',
            data: [{
                key: '1',
                value: '新车'
            }, {
                key: '2',
                value: '二手车'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '最低贷款成数',
            field: 'minCs'
        }, {
            title: '最高贷款成数',
            field: 'maxCs'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            editCode: 632080,
            detailCode: 632086
        });
    }
}

export default loanPercentAddedit;