import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

class CompAdd extends React.Component {
  render() {
    let that = this;
    const options = {
      fields: [{
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
        required: true,
        value: this.props.parentCode
      }, {
        field: 'name',
        title: '名称',
        required: true,
        maxlength: 30
      }, {
        field: 'leadUserId',
        type: 'select',
        listCode: 630066,
        keyName: 'userId',
        valueName: '{{realName.DATA}}-{{mobile.DATA}}',
        searchName: 'keyword',
        title: '负责人',
        required: true
      }, {
        field: 'orderNo',
        title: 'UI次序',
        required: true,
        help: '数字越小，排序越靠前',
        integer: true,
        maxlength: 30
      }, {
        field: 'type',
        title: '类型',
        type: 'select',
        data: [{
          dkey: '1',
          dvalue: '公司'
        }, {
          dkey: '2',
          dvalue: '部门'
        }],
        keyName: 'dkey',
        valueName: 'dvalue',
        required: true
      }, {
        field: 'provinceNo',
        title: '区域',
        type: 'citySelect',
        cFields: ['provinceNo', 'cityNo', 'areaNo']
      }],
      addCode: 630100,
      onOk: (data, params) => {
        that.props.addComp({
          ...params,
          code: data.code
        });
      }
    };
    return (
      <ModalDetail
        title='新增公司/部门'
        visible={this.props.compVisible}
        hideModal={() => this.props.setCompVisible(false)}
        options={options} />
    );
  }
}

export default CompAdd;
