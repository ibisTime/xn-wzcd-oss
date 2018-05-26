import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

class CompAdd extends React.Component {
  render() {
    let that = this;
    const options = {
      fields: [{
        field: 'type',
        hidden: true,
        value: '1'
      }, {
        field: 'parentCode',
        hidden: true,
        value: this.props.parentCode
      }, {
        field: 'name',
        title: '名称',
        required: true,
        maxlength: 30
      }, {
        field: 'leadName',
        title: '负责人',
        required: true,
        maxlength: 30
      }, {
        field: 'mobile',
        title: '负责人手机号',
        required: true,
        mobile: true
      }],
      addCode: 630100,
      onOk: (data, params) => {
        that.props.addComp({
          ...params,
          code: data.code
        }, this.props.parentCode);
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
