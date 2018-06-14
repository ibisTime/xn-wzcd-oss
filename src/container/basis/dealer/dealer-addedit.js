import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/basis/dealer-addedit';
import {
    getQueryString
} from 'common/js/util';
import {
    DetailWrapper,
    beforeDetail
} from 'common/js/build-detail';

@DetailWrapper(
    state => state.basisDealerAddedit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class dealerAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '全称',
            field: 'fullName',
            required: true
        }, {
            title: '简称',
            field: 'abbrName',
            required: true
        }, {
            title: '是否自主开发',
            field: 'isSelfDevelop',
            type: 'select',
            required: true,
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
            field: 'address'
        }, {
            title: '车行经营性质',
            field: 'carDealerType',
            required: true
        }, {
            title: '主要联系人',
            field: 'mainContact'
        }, {
            title: '联系人电话',
            field: 'contactPhone'
        }, {
            title: '主营品牌',
            field: 'mainBrand'
        }, {
            title: '所属集团',
            field: 'parentGroup'
        }, {
            title: '经销商收款账号',
            field: 'jxsCollectBankcardList',
            required: true,
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
            field: 'agreement'
        }, {
            title: '工商返点账号',
            field: 'gsCollectBankcardList',
            required: true,
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
            required: true,
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
            required: true,
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
            required: true
        }, {
            title: '业务部门',
            field: 'areaName'
        }, {
            title: '车商合作协议',
            field: 'agreementPic',
            type: 'img',
            required: true
        }, {
            title: '协议状态',
            field: 'agreementStatus',
            required: true
        }, {
            title: '结算方式',
            field: 'settleWay',
            required: true
        }, {
            title: '业务区域',
            field: 'businessArea',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }, {
            title: '归属分公司',
            field: 'belongBranchCompany',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 632060,
            editCode: 632062,
            detailCode: 632066
        });
    }
}

export default dealerAddedit;