import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/carShape-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.bizCarShapeAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class CarShapeAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'brandCode',
      title: '品牌',
      type: 'select',
      listCode: 630406,
      onChange: (v, d) => {
        fetch(630416, {
          status: '1',
          brandCode: v
        }).then((data) => {
          this.props.setSelectData({
            data,
            key: 'seriesCode'
          });
        });
      },
      params: {
        status: '1'
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '车系',
      field: 'seriesCode',
      type: 'select',
      required: true,
      listCode: 630416,
      params: {
        status: '1'
      },
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'name',
      title: '名称',
      required: true
    }, {
      title: '缩略图',
      field: 'pic',
      required: true,
      type: 'img',
      single: true
    }, {
      title: '广告图',
      field: 'advPic',
      required: true,
      type: 'img'
    }, {
      title: '图文描述',
      field: 'description',
      required: true,
      type: 'textarea'
    }, {
      title: '广告语',
      field: 'slogan',
      required: true,
      type: 'textarea'
    }, {
      title: '厂商指导价',
      field: 'originalPrice',
      required: true,
      amount: true
    }, {
      title: '经销商参考价',
      field: 'salePrice',
      required: true,
      amount: true
    }, {
      title: '首付参考价',
      field: 'sfAmount',
      required: true,
      amount: true
    }, {
      title: '车辆分期介绍',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630420,
      editCode: 630422,
      detailCode: 630427,
      beforeSubmit: (param) => {
        var data = this.props.selectData;
        console.log(data);
        let len = data.brandCode.length;
        for(var i = 0; i < len; i++) {
          if(param.brandCode === data.brandCode[i].code) {
            param.brandName = data.brandCode[i].name;
          }
        }
        let length = data.seriesCode.length;
        for(var j = 0; j < length; j++) {
          if(param.seriesCode === data.seriesCode[j].code) {
            param.seriesName = data.seriesCode[j].name;
          }
        }
        return param;
      }
    });
  }
}

export default CarShapeAddEdit;
