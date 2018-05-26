import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/handleApply-addedit';
import {
    getQueryString,
    showSucMsg,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
import {
    DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(state => state.bizHandleApplyAddedit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
})
class handleApplyAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '订单编号',
            field: 'code',
            readonly: true
        }, {
            title: '申请人姓名',
            field: 'userId',
            readonly: true
        }, {
            title: '意向车辆',
            field: 'idNo',
            formatter: (v, d) => {
              return (d.brandName + d.carName + d.seriesName);
            }
        }, {
            title: '首付比例',
            field: 'sfRate',
            readonly: true
        }, {
            title: '首付金额',
            field: 'sfAmount',
            readonly: true,
            amount: true
        }, {
            title: '分期期数',
            field: 'periods',
            readonly: true
        }, {
            title: '申请时间',
            field: 'createDatetime',
            type: 'datetime',
            readonly: true
        }, {
            title: '车贷计算器信息',
            field: 'saleDesc',
            readonly: true
        }, {
            title: '备注',
            field: 'remark',
            readonly: true
        }];
        return this
            .props
            .buildDetail({
                fields,
                code: this.code,
                view: this.view,
                detailCode: 630437
            });
    }
}

export default handleApplyAddedit;