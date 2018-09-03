import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { showSucMsg, showWarnMsg, getQueryString, getUserId } from 'common/js/util';
import { getIdNoFront, getIdNoReverse } from 'api/user';

@Form.create()
export default class Demo extends DetailUtil {
  constructor(props) {
    super(props);
    // this.state = {
    //   entryVisible: false,
    //   creditResult: [],
    //   selectData: {},
    //   selectKey: ''
    // };
    this.state = {
      ...this.state,
      newCar: true
    };
    this.code = getQueryString('code', this.props.location.search);
    // 发起征信
    this.isAddedit = !!getQueryString('isAddedit', this.props.location.search);
    // 录入征信结果
    this.isEntry = !!getQueryString('isEntry', this.props.location.search);
    // 信贷专员初审
    this.isCheck = !!getQueryString('isCheck', this.props.location.search);
    // 准入审查
    this.isCheckFirst = !!getQueryString('isCheckFirst', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    // this.newCar = true;
    this.creditUserListIndex = 6;
    this.buttons = [];
    this.concatFalg = false;
  }
  render() {
    let o2mFields = [{
        title: '姓名',
        field: 'userName',
        nowrap: true,
        required: true,
        width: 80
    }, {
        title: '与借款人关系',
        field: 'relation',
        type: 'select',
        key: 'credit_user_relation',
        required: true
    }, {
        title: '贷款角色',
        field: 'loanRole',
        type: 'select',
        key: 'credit_user_loan_role',
        required: true
    }, {
        title: '手机号',
        field: 'mobile',
        mobile: true,
        required: true,
        render: (v) => {
            let val = (v && v.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')) || '';
            return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
        }
    }, {
        title: '身份证号',
        field: 'idNo',
        idCard: true,
        required: true,
        render: (v) => {
            let val = (v && v.replace(/^(\d{6}).+(\d{4})$/, '$1****$2')) || '';
            return <span style={{whiteSpace: 'nowrap'}}>{val}</span>;
        }
    }, {
        title: '身份证正面',
        field: 'idNoFront',
        type: 'img',
        single: true,
        required: true,
        onChange: (v, props) => {
            if (v) {
                props.doFetching();
                getIdNoFront(v).then((data) => {
                    if (data.success) {
                        let birthYear = data.birth.substr(0, 4);
                        let date = new Date();
                        let nowYear = date.getFullYear();
                        let num = nowYear - birthYear;
                        if(num < 18) {
                            showWarnMsg('18周岁以下征信不能提交');
                            return;
                        }
                        props.form.setFieldsValue({
                            idNo: data.idNo,
                            userName: data.realName
                        });
                    } else {
                        showWarnMsg('识别失败，请手动输入');
                    }
                    props.cancelFetching();
                }).catch(() => {
                    props.cancelFetching();
                });
            }
        }
    }, {
        title: '身份证反面',
        field: 'idNoReverse',
        type: 'img',
        single: true,
        required: true,
        onChange: (v, props) => {
            if (v) {
                props.doFetching();
                getIdNoReverse(v).then((data) => {
                    console.log(data);
                    if (data.success) {
                        let str = data.endDate;
                        let str1 = str.substr(0, 4);
                        let str2 = str.substr(4, 2);
                        let str3 = str.substr(6, 2);
                        let arr = [str1, str2, str3];
                        let date = arr.join('/');
                        var d = new Date('2019/09/09');
                        var n = new Date();
                        let days = (d.getTime() - n.getTime()).toFixed(0);
                        if(days < 0) {
                            showWarnMsg('身份证已经过期');
                        }else if(days < 90) {
                            showSucMsg('身份证有效期不足90天');
                        }
                    } else {
                        showWarnMsg('识别失败，请手动输入');
                    }
                    props.cancelFetching();
                }).catch(() => {
                    props.cancelFetching();
                });
            }
        }
    }, {
        title: '征信查询授权书',
        field: 'authPdf',
        type: 'img',
        single: true,
        required: true
    }, {
        title: '面签照片',
        field: 'interviewPic',
        type: 'img',
        single: true,
        required: true
    }, {
        title: '是否发送一审',
        field: 'isFirstAudit',
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
        readonly: true,
        hidden: !(this.isCheckSalesman || this.isCheckFirst),
        noVisible: !(this.isCheckSalesman || this.isCheckFirst)
    }];
    let fields = [{
      title: '信贷专员',
      field: 'saleUserName',
      type: 'select',
      pageCode: 630065,
      params: {
        type: 'P',
        roleCode: 'SR201800000000000000YWY'
      },
      keyName: 'userId',
      valueName: '{{companyName.DATA}}-{{realName.DATA}}',
      searchName: 'realName'
    }, {
        title: '业务团队',
        field: 'teamName',
        hidden: this.isAddedit
    }, {
        title: '银行',
        field: 'loanBankCode',
        type: 'select',
        listCode: 632037,
        keyName: 'code',
        valueName: '{{bankName.DATA}}{{subbranch.DATA}}',
        required: true
    }, {
        title: '业务种类',
        field: 'bizType',
        type: 'select',
        key: 'budget_orde_biz_typer',
        required: true,
        onChange: (value) => {
            if (value) {
                this.setState({ newCar: value === '0' });
            }
        }
    }, {
        title: '贷款金额',
        field: 'loanAmount',
        amount: true,
        min: '1',
        required: true
    }, {
        title: '二手车评估报告',
        field: 'secondCarReport',
        type: 'file',
        hidden: this.state.newCar
    }, {
        title: '征信列表',
        field: 'creditUserList',
        type: 'o2m',
        options: {
            add: true,
            edit: true,
            delete: true,
            detail: !(this.isEntry || !this.view),
            check: this.isEntry,
            checkName: '录入',
            scroll: {x: 1300},
            fields: o2mFields
        }
    }, {
        title: '说明',
        field: 'note',
        type: 'textarea',
        normalArea: true
    }, {
        title: '审核说明',
        field: 'approveNote',
        readonly: !this.isCheck,
        hidden: !this.isCheck
    }, {
        field: 'jourDatetime',
        title: '流水时间',
        type: 'datetime'
    }, {
        field: 'jourDatetime1',
        title: '流水时间1',
        type: 'date',
        rangedate: ['jourDatetimeStart', 'jourDatetimeEnd']
    }, {
        field: 'workDatetime',
        title: '何时进入现单位工作',
        type: 'month'
    }, {
        field: 'province',
        title: '省市区',
        type: 'citySelect',
        onChange: (v, o) => console.log(v, o)
    }, {
        title: '交款项目',
        field: 'remitProject',
        key: 'remit_project',
        type: 'checkbox',
        onChange: (v) => console.log(v),
        required: true
    }, {
        field: 'parentCode',
        title: '上级',
        type: 'treeSelect',
        listCode: 630106,
        keyName: 'code',
        valueName: 'name',
        bParams: ['type'],
        params: {
            status: 1,
            typeList: [1, 2]
        },
        onChange: (value, label, extra) => console.log(value, label, extra)
    }, {
        field: 'description',
        title: '富文本',
        required: true,
        type: 'textarea'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 632117,
      // detailCode: 808026,
      buttons: this.buttons,
      beforeSubmit: (param) => {
        if (!param.creditUserList) {
          showWarnMsg('至少新增一条征信列表');
          return false;
        } else {
          param.operator = getUserId();
          return param;
        }
      }
    });
  }
}
