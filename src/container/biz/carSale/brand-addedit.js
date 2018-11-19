import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/brand-addedit';
import {
  getQueryString
} from 'common/js/util';
import {
  DetailWrapper
} from 'common/js/build-detail';

@DetailWrapper(
  state => state.bizBrandAddEdit, {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
  }
)
class BrandAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '名称',
      field: 'name',
      required: true
    }, {
      field: 'logo',
      title: 'logo',
      type: 'img',
      required: true,
      single: true
    }, {
      field: 'description',
      title: '品牌介绍',
      type: 'textarea',
      normalArea: true,
      required: true
    }, {
      title: '字母顺序',
      field: 'letter',
      type: 'select',
      required: true,
      search: true,
      data: [{
        key: 'A',
        value: 'A'
      }, {
        key: 'B',
        value: 'B'
      }, {
        key: 'C',
        value: 'C'
      }, {
        key: 'D',
        value: 'D'
      }, {
        key: 'E',
        value: 'E'
      }, {
        key: 'F',
        value: 'F'
      }, {
        key: 'G',
        value: 'G'
      }, {
        key: 'H',
        value: 'H'
      }, {
        key: 'I',
        value: 'I'
      }, {
        key: 'J',
        value: 'J'
      }, {
        key: 'K',
        value: 'K'
      }, {
        key: 'L',
        value: 'L'
      }, {
        key: 'M',
        value: 'M'
      }, {
        key: 'N',
        value: 'N'
      }, {
        key: 'O',
        value: 'O'
      }, {
        key: 'P',
        value: 'P'
      }, {
        key: 'Q',
        value: 'Q'
      }, {
        key: 'L',
        value: 'L'
      }, {
        key: 'S',
        value: 'S'
      }, {
        key: 'T',
        value: 'T'
      }, {
        key: 'U',
        value: 'U'
      }, {
        key: 'V',
        value: 'V'
      }, {
        key: 'W',
        value: 'W'
      }, {
        key: 'X',
        value: 'X'
      }, {
        key: 'Y',
        value: 'Y'
      }, {
        key: 'Z',
        value: 'Z'
      }],
      keyName: 'key',
      valueName: 'value'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 630400,
      editCode: 630402,
      detailCode: 630407
    });
  }
}

export default BrandAddedit;
