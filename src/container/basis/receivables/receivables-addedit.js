import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/receivables-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisReceivablesAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class ReceivablesAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '公司',
            field: 'companyCode',
            type: 'select',
            listCode: 630106,
            params: {
                status: '1',
                typeList: ['1']
            },
            keyName: 'code',
            valueName: 'name',
            searchName: 'keyword',
            required: true
        }, {
            title: '户名',
            field: 'realName',
            required: true
        }, {
            title: '类型',
            field: 'type',
            value: '1',
            required: true,
            hidden: true
        }, {
            title: '银行名称',
            field: 'bankCode',
            type: 'select',
            listCode: 802116,
            keyName: 'bankCode',
            valueName: 'bankName',
            searchName: 'bankName',
            required: true
        }, {
            title: '开户支行',
            field: 'subbranch',
            required: true
        }, {
            title: '银行卡号',
            field: 'bankcardNumber',
            bankCard: true,
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632000,
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

export default ReceivablesAddedit;
