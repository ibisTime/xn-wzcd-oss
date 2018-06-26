import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/mortgages/mortgages-addedit';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.mortgagesAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class mortgagesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'realName',
            formatter: (v, d) => {
                return d.user.realName;
            }
        }, {
            title: '身份证',
            field: 'idNo',
            formatter: (v, d) => {
                return d.user.idNo;
            }
        }, {
            title: '业务编号',
            field: 'code'
        }, {
            title: '贷款银行',
            field: 'bankcardCode'
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            formatter: (v, d) => {
                return moneyFormat(d.repayBiz.loanAmount);
            }
        }, {
            title: '逾期记录',
            field: '33'
        }, {
            title: '代偿记录',
            field: '44'
        }, {
            title: '解除日期',
            field: 'releaseDatetime',
            type: 'datetime'
        }, {
            title: '模板ID',
            field: 'releaseTemplateId',
            type: 'select',
            key: 'template_id'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630521
        });
    }
}

export default mortgagesAddedit;