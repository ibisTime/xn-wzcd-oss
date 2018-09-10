import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail-dev';
import { Form } from 'antd';

@Form.create()
export default class InvoiceAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
          ...this.state,
          hiddenStatus: true
        };
    }
    render() {
        const fields = [{
            title: '客户姓名',
            field: 'customerName',
            readonly: true
        }, {
            title: '业务编号',
            field: 'code',
            readonly: true
        }, {
            title: '身份证',
            field: 'idNo',
            readonly: true
        }, {
            title: '贷款金额',
            field: 'loanAmount',
            readonly: true,
            amount: true
        }, {
            title: '贷款银行',
            field: 'loanBankName',
            readonly: true,
            required: true,
            formatter: (v, data) => {
                return data.bankSubbranch && (data.bankSubbranch.bank.bankName + '-' + data.bankSubbranch.abbrName);
            }
        }, {
            title: '购车途径',
            field: 'shopWay',
            type: 'select',
            key: 'budget_orde_biz_typer',
            readonly: true,
            required: true,
            onChange: (value) => {
                this.setState({
                    hiddenStatus: value === '1'
                });
            }
        }, {
            title: '是否垫资',
            field: 'isAdvanceFund',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true,
            readonly: true
        }, {
            title: '提车日期',
            field: 'deliveryDatetime',
            type: 'date',
            required: true
        }, {
            title: '发票价',
            field: 'invoicePrice',
            readonly: true,
            amount: true
        }, {
            title: '发票是否正确',
            field: 'isRightInvoice',
            type: 'select',
            data: [{
                key: '0',
                value: '不匹配'
            }, {
                key: '1',
                value: '匹配'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            title: '现发票价',
            field: 'currentInvoicePrice',
            required: true,
            onChange: (v) => {
                let money = this.state.pageData.loanAmount;
                this.setState({
                    ...this.state.pageData,
                    PreCompanyLoanCs: moneyFormat((money / (v * 1000)) * 1000)
                });
            },
            amount: true
        }, {
            title: '准入贷款成数标准',
            field: 'companyLoanCs',
            readonly: true
        }, {
            title: '新贷款成数',
            field: 'PreCompanyLoanCs',
            readonly: true
        }, {
            title: '车辆颜色',
            field: 'carColor',
            required: true
        }, {
            title: '车架号',
            field: 'frameNo',
            hidden: !this.state.hiddenStatus,
            required: true,
            readonly: this.state.pageData ? !!this.state.pageData.frameNo : false
        }, {
            title: '交强险金额',
            field: 'forceInsurance',
            amount: true
        }, {
            title: '交强险',
            field: 'forceInsurancePdf',
            type: 'img',
            required: true
        }, {
            title: '发票',
            field: 'invoice',
            required: true,
            type: 'img'
        }, {
            title: '合格证',
            field: 'certification',
            required: true,
            type: 'img'
        }, {
            title: '商业险',
            field: 'businessInsurance',
            required: true,
            type: 'img'
        }, {
            title: '机动车登记证书',
            field: 'motorRegCertification',
            required: true,
            hidden: !this.state.hiddenStatus,
            type: 'img'
        }, {
            title: '批单',
            field: 'pdPdf',
            required: true,
            type: 'img'
        }, {
            title: '备注',
            field: 'fbhRemark'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632146
        });
    }
}
