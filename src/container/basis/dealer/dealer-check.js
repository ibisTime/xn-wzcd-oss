import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/dealer-check';
import {
  getQueryString,
  showSucMsg,
  getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisDealerCheck, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class dealerCheck extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '全称',
            field: 'fullName',
            readonly: true
        }, {
            title: '简称',
            field: 'abbrName',
            readonly: true
        }, {
            title: '是否自主开发',
            field: 'isSelfDevelop',
            type: 'select',
            readonly: true,
            search: true,
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '地址',
            field: 'address',
            readonly: true
        }, {
            title: '车行经营性质',
            field: 'carDealerType',
            readonly: true
        }, {
            title: '主要联系人',
            field: 'mainContact',
            readonly: true
        }, {
            title: '联系人电话',
            field: 'contactPhone',
            readonly: true
        }, {
            title: '主营品牌',
            field: 'mainBrand',
            readonly: true
        }, {
            title: '所属集团',
            field: 'parentGroup',
            readonly: true
        }, {
            title: '经销商收款账号',
            field: 'jxsCollectBankcardList',
            readonly: true,
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {
                    x: 500
                },
                fields: [{
                        title: '开户行',
                        field: 'subbranch'
                    },
                    {
                        title: '户名',
                        field: 'realname'
                    },
                    {
                        title: '账号',
                        field: 'bankcardNumber'
                    }
                ]
            }
        }, {
            title: '协议',
            field: 'areaNaaame',
            readonly: true
        }, {
            title: '工商返点账号',
            field: 'gsCollectBankcardList',
            readonly: true,
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {
                    x: 500
                },
                fields: [{
                        title: '开户行',
                        field: 'subbranch'
                    },
                    {
                        title: '户名',
                        field: 'realname'
                    },
                    {
                        title: '账号',
                        field: 'bankcardNumber'
                    },
                    {
                        title: '返点比例',
                        field: 'pointRate'
                    }
                ]
            }
        }, {
            title: '中行返点账号',
            field: 'zhCollectBankcardList',
            readonly: true,
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {
                    x: 500
                },
                fields: [{
                        title: '开户行',
                        field: 'subbranch'
                    },
                    {
                        title: '户名',
                        field: 'realname'
                    },
                    {
                        title: '账号',
                        field: 'bankcardNumber'
                    },
                    {
                        title: '返点比例',
                        field: 'pointRate'
                    }
                ]
            }
        }, {
            title: '建行返点账号',
            field: 'jhCollectBankcardList',
            readonly: true,
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {
                    x: 500
                },
                fields: [{
                        title: '开户行',
                        field: 'subbranch'
                    },
                    {
                        title: '户名',
                        field: 'realname'
                    },
                    {
                        title: '账号',
                        field: 'bankcardNumber'
                    },
                    {
                        title: '返点比例',
                        field: 'pointRate'
                    }
                ]
            }
        }, {
            title: '合作协议有效期',
            field: 'agreementValidDate',
            type: 'date',
            readonly: true
        }, {
            title: '业务部门',
            field: 'areaName',
            readonly: true
        }, {
            title: '车商合作协议',
            field: 'agreementPic',
            type: 'img',
            readonly: true
        }, {
            title: '协议状态',
            field: 'agreementStatus',
            readonly: true
        }, {
            title: '结算方式',
            field: 'settleWay',
            readonly: true
        }, {
            title: '备注',
            field: 'remark',
            readonly: true
        }, {
            title: '归属分公司',
            field: 'belongBranchCompany',
            readonly: true
        }, {
            title: '审核说明',
            field: 'approveNote',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 632066,
            buttons: [{
              title: '通过',
              handler: (param) => {
                param.auditResult = '1';
                param.auditor = getUserId();
                this.props.doFetching();
                fetch(632063, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true,
              type: 'primary'
            }, {
              title: '不通过',
              handler: (param) => {
                param.auditResult = '0';
                param.auditor = getUserId();
                this.props.doFetching();
                fetch(632063, param).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.history.go(-1);
                  }, 1000);
                }).catch(this.props.cancelFetching);
              },
              check: true
            }, {
              title: '返回',
              handler: (param) => {
                this.props.history.go(-1);
              }
            }]
        });
    }
}

export default dealerCheck;