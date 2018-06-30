import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/whiteList/whiteList-addedit';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {
    DetailWrapper
} from 'common/js/build-detail';
// import { COMPANY_CODE } from 'common/js/config';

@DetailWrapper(
    state => state.bizWhiteListAddEdit, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class WhiteListAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
          title: '业务编号',
          field: 'code',
          readonly: true
        }, {
          field: 'user',
          title: '贷款人',
          formatter: (v, d) => {
            return d.user.realName;
          },
          readonly: true
        }, {
          title: '逾期日期',
          field: 'repayDatetime',
          type: 'date',
          readonly: true
        }, {
          title: '未还清收成本(元)',
          field: 'restTotalCost',
          amount: true
        }, {
          title: '清收成本清单',
          field: 'costList',
          type: 'o2m',
          options: {
            fields: [{
              title: '费用项',
              field: 'item'
            }, {
              title: '金额（元）',
              field: 'amount',
              amount: true
            }, {
              title: '发生时间',
              field: 'payDatetime',
              type: 'date'
            }, {
              title: '状态',
              field: 'status',
              type: 'select',
              key: 'cost_status'
            }, {
              title: '备注',
              field: 'remark'
            }]
          }
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 630541
        });
    }
}

export default WhiteListAddEdit;