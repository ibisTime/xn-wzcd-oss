import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/printing/mortgage-make';
import {
    getQueryString,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.printingMortgageMake, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class MortgageMake extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '主贷人姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '身份证号码',
            field: 'idNo',
            readonly: true
        }, {
            title: '配偶姓名',
            field: 'ghRealName',
            readonly: true
        }, {
            title: '身份证号码',
            field: 'ghIdNo',
            readonly: true
        }, {
            title: '家庭地址',
            field: 'applyNowAddress',
            readonly: true
        }, {
            title: '担保合同编号',
            field: 'guaranteeContractCode',
            readonly: true
        }, {
            title: '账单日',
            field: 'billDatetime',
            readonly: true
        }, {
            title: '信用卡号',
            field: 'customerName',
            readonly: true
        }, {
            title: '车牌号',
            field: 'carNumber'
        }, {
            title: '车架号',
            field: 'frameNo'
        }, {
            title: '发动机号',
            field: 'engineNo'
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '银行贷款额',
            field: 'loanAmount',
            readonly: true
        }, {
            title: '服务费',
            field: 'fee',
            readonly: true
        }, {
            title: '履约保证金',
            field: 'lyAmount',
            readonly: true
        }, {
            title: '贷款期限（年）',
            field: 'guarantContractDeadline',
            readonly: true
        }, {
            title: '银行全称',
            field: '1',
            readonly: true
        }, {
            title: '银行委托人',
            field: '1',
            readonly: true
        }, {
            title: '银行地址',
            field: '1',
            readonly: true
        }, {
            title: '银行电话',
            field: '1',
            readonly: true
        }, {
            title: '委托数有效期',
            field: '1',
            readonly: true
        }, {
            title: '授权人姓名',
            field: '1',
            readonly: true
        }, {
            title: '授权人身份证',
            field: '1',
            readonly: true
        }, {
            title: '授权人电话',
            field: '1',
            readonly: true
        }, {
            title: '授权人地址',
            field: '1',
            readonly: true
        }, {
            title: '信用卡类型',
            field: '1',
            readonly: true
        }, {
            title: '信用卡名称',
            field: '1',
            readonly: true
        }, {
            title: '所属地区',
            field: '1',
            readonly: true
        }, {
            title: '套打模版',
            field: 'pledgePrintTemplateId',
            type: 'select',
            key: 'guarant_print_template_id'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146,
            buttons: [{
                    title: '打印',
                    check: true,
                    handler: (param) => {
                        param.operator = getUserId();
                        this.props.doFetching();
                        fetch(632192, param).then((data) => {
                            console.log(data);
                            showSucMsg('操作成功');
                        }).catch(this.props.cancelFetching);
                    }
                },
                {
                    title: '返回',
                    handler: (param) => {
                        this.props.history.go(-1);
                    }
                }
            ]
        });
    }
}

export default MortgageMake;