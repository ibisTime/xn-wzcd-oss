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
            required: true
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
            field: 'openBank'
        }, {
            title: '银行地址',
            field: 'address'
        }, {
            title: '电话号码',
            field: 'phoneNumber',
            mobile: true
        }, {
            title: '邮编',
            field: 'bankClient',
            number: true
        }, {
            title: '银行委托人',
            field: 'bankClient'
        }, {
            title: '委托有效期',
            field: 'clientValidDate',
            type: 'date'
        }, {
            title: '授权人姓名',
            field: 'autherName'
        }, {
            title: '授权人电话',
            field: 'autherPhone',
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
            field: 'creditCardType'
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
            addCode: 632030,
            editCode: 632032,
            detailCode: 632036,
            beforeSubmit: (param) => {
                if (!param.bankRateList) {
                    showWarnMsg('至少新增一条利率明细！');
                    return;
                }
                let bank = this.props.selectData.bankCode.find(v => v.bankCode === param.bankCode);
                param.bankName = bank.bankName;
                param.updater = getUserId();
                return param;
            }
        });
    }
}

export default subbranchAddedit;
