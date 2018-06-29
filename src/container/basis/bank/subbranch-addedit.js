import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/subbranch-addedit';
import {
    getQueryString,
    getUserId,
    showWarnMsg,
    tempString
} from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisSubbranchAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class subbranchAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.bankCode = getQueryString('bankCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '银行名称',
            field: 'bankCode',
            type: 'select',
            listCode: 632037,
            keyName: 'bankCode',
            valueName: '{{bankName.DATA}}-{{bankCode.DATA}}',
            required: true,
            readonly: true,
            formatter: () => {
                let bank = this.props.selectData.bankCode.find(v => v.code === this.bankCode);
                return bank.bankName + '-' + bank.bankCode;
            }
        }, {
            title: '支行简称',
            field: 'abbrName',
            required: true
        }, {
            title: '支行全称',
            field: 'fullName',
            required: true
        }, {
            title: '开户行',
            field: 'openBank',
            required: true
        }, {
            title: '银行地址',
            field: 'address'
        }, {
            title: '电话号码',
            field: 'phoneNumber',
            mobile: true
        }, {
            title: '邮编',
            field: 'postCode',
            number: true
        }, {
            title: '银行委托人',
            field: 'bankClient'
        }, {
            title: '委托有效期',
            field: 'clientValidDate',
            type: 'datetime'
        }, {
            title: '授权人姓名',
            field: 'autherName'
        }, {
            title: '授权人电话',
            field: 'autherPhoneNumber',
            mobile: true
        }, {
            title: '授权人身份证',
            field: 'autherIdNo',
            idCard: true
        }, {
            title: '授权人地址',
            field: 'autherAddress'
        }, {
            title: '信用卡类型',
            field: 'creditCardType',
            type: 'select',
            key: 'credit_card_type'
        }, {
            title: '信用卡名称',
            field: 'creditCardName'
        }, {
            title: '所属地区',
            field: 'belongArea'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632050,
            editCode: 632052,
            detailCode: 632056,
            beforeSubmit: (param) => {
                param.updater = getUserId();
                param.bankCode = this.bankCode;
                return param;
            }
        });
    }
}

export default subbranchAddedit;
