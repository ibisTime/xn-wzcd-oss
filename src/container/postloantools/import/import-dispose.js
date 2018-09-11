import {
    getQueryString,
    moneyFormat,
    getUserId,
    showSucMsg
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';
import { Form } from 'antd';

@Form.create()
export default class ApplyGpsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.budgetOrderCode = getQueryString('budgetOrderCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            isSingle: false
        };
    }

    render() {
        const fields = [{
            title: '不匹配原因',
            field: 'notMateResult',
            type: 'select',
            data: [{
                key: '0',
                value: '信息不匹配'
            }, {
                key: '1',
                value: '一卡多贷'
            }],
            keyName: 'key',
            valueName: 'value',
            onChange: (v) => {
                this.setState({
                    isSingle: v === '1'
                });
            },
            readonly: true
        }, {
            title: '导入日期',
            field: 'importDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '客户姓名',
            field: 'realName',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            amount: true,
            readonly: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true
        }, {
            title: '放款日期',
            field: 'fkDatetime',
            type: 'date',
            readonly: true
        }, {
            title: '对应业务',
            field: 'repayBizCode',
            type: 'select',
            pageCode: 630520,
            params: {
                curNodeCodeList: ['020_01']
            },
            keyName: 'code',
            valueName: '{{refCode.DATA}}-{{realName.DATA}}',
            hidden: this.state.isSingle,
            required: true
        }, {
            title: '对应业务列表',
            field: 'codeList',
            hidden: !this.state.isSingle,
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                fields: [{
                    title: '业务编号',
                    field: 'code1',
                    type: 'select',
                    pageCode: 630520,
                    params: {
                        curNodeCodeList: ['020_01']
                    },
                    keyName: 'code',
                    valueName: '{{refCode.DATA}}-{{realName.DATA}}',
                    required: true,
                    onChange: (v, data, props) => {
                        props.setPageData({
                            code: data.code,
                            realName: data.realName,
                            idNo: data.idNo,
                            amount: moneyFormat(data.amount)
                        });
                    },
                    noVisible: true
                }, {
                    title: '业务编号',
                    field: 'code',
                    hidden: true
                }, {
                    title: '客户姓名',
                    field: 'realName',
                    hidden: true
                }, {
                    title: '身份证号',
                    field: 'idNo',
                    hidden: true
                }, {
                    title: '逾期金额',
                    field: 'amount',
                    hidden: true
                }]
            }
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632306,
            buttons: [{
                title: '确认',
                handler: (param) => {
                    param.code = this.code;
                    param.operator = getUserId();
                    this.doFetching();
                    fetch(632301, param).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}
