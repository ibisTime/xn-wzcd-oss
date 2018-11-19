import React from 'react';
import { initStates, doFetching, cancelFetching, setSelectData,
  setPageData, restore } from '@redux/loan/budget-valuation';
import { getQueryString, getUserId, showSucMsg, showWarnMsg } from 'common/js/util';
import fetch from 'common/js/fetch';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
    state => state.loanBudgetValuation, {
        initStates,
        doFetching,
        cancelFetching,
        setSelectData,
        setPageData,
        restore
    }
)
class BudgetValuation extends React.Component {
    constructor(props) {
        super(props);
        this.budgetCode = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '上牌时间',
            field: 'regDate',
            type: 'month',
            required: true
        }, {
          title: '品牌',
          field: 'brandCode',
          type: 'select',
          listCode: 630406,
          params: {
            status: '1',
            type: '1'
          },
          onChange: (v) => {
            this.props.setSelectData({
              data: [],
              key: 'seriesCode'
            });
            this.props.setSelectData({
              data: [],
              key: 'modelId'
            });
            if (v) {
              fetch(630416, {
                brandCode: v,
                status: '1',
                type: '1'
              }).then((data) => {
                this.props.setSelectData({
                  data,
                  key: 'seriesCode'
                });
              }).catch(() => {});
            }
          },
          keyName: 'code',
          valueName: 'name',
          required: true
        }, {
          title: '车系',
          field: 'seriesCode',
          type: 'select',
          required: true,
          keyName: 'code',
          valueName: 'name',
          onChange: (v) => {
            this.props.setSelectData({
              data: [],
              key: 'modelId'
            });
            if (v) {
              fetch(630426, {
                seriesCode: v,
                status: '1',
                type: '1'
              }).then((data) => {
                this.props.setSelectData({
                  data,
                  key: 'modelId'
                });
              }).catch(() => {});
            }
          }
        }, {
          title: '车型',
          field: 'modelId',
          type: 'select',
          required: true,
          keyName: 'modelId',
          valueName: 'name'
        }, {
            title: '公里数(单位万公里)',
            field: 'mile',
            required: true
        }, {
            title: '城市',
            field: 'zone',
            type: 'select',
            listCode: 630447,
            keyName: 'id',
            valueName: '{{provName.DATA}} {{cityName.DATA}}',
            required: true
        }, {
            field: 'code',
            hidden: true,
            value: this.budgetCode
        }];
        return this.props.buildDetail({
            fields,
            addCode: 630450
        });
    }
}

export default BudgetValuation;
