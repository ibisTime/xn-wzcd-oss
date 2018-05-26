import React from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Tree, Modal } from 'antd';
import CompAdd from 'component/comp-add/comp-add';
import { showSucMsg, showWarnMsg } from 'common/js/util';
import { formItemLayout, tailFormItemLayout } from 'common/js/config';
import { initData } from '@redux/security/compConstruct';

const TreeNode = Tree.TreeNode;

@connect(
  state => state.securityCompConstruct,
  { initData, setSelectedKeys }
)
class CompConstruct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compVisible: false
    };
  }
  componentDidMount() {
    this.props.initData();
  }
  setCompVisible = (compVisible) => {
    this.setState({ compVisible });
  }
  handleBtnClick = (url) => {}
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  onSelect = (keys) => {
    this.props.setSelectedKeys(keys);
  }
  // editCompany = () => {
  //   if (this.state.selectKey !== '') {
  //     this.props.history.push(`/newProj/addCompany?code=${this.state.selectKey}`);
  //   } else {
  //     showWarnMsg('请选择一家公司');
  //   }
  // }
  // addBumen = () => {
  //   if (this.state.selectKey !== '') {
  //     this.props.history.push(`/newProj/addBumen?companyCode=${this.state.selectKey}`);
  //   } else {
  //     showWarnMsg('请选择一家公司');
  //   }
  // }
  // editBumen = () => {
  //   if (this.state.selectKey !== '' && this.companyCodeObj[this.state.selectKey] !== undefined) {
  //     let companyCode = this.companyCodeObj[this.state.selectKey];
  //     this.props.history.push(`/newProj/addBumen?code=${this.state.selectKey}&companyCode=${companyCode}`);
  //   } else {
  //     showWarnMsg('请选择一个部门');
  //   }
  // }
  // deleteBumen = () => {
    // if (this.state.selectKey !== '') {
    //   Modal.confirm({
    //     okText: '确认',
    //     cancelText: '取消',
    //     content: '确定删除该部门？',
    //     onOk: () => {
    //       this.setState({ fetching: true });
    //       deleteBumen1(this.state.selectKey).then(() => {
    //         showSucMsg('操作成功');
    //         this.setState({ fetching: false });
    //       }).catch(this.setState({ fetching: false }));
    //     }
    //   });
    // } else {
    //   showWarnMsg('请选择一家公司');
    // }
  // }
  render() {
    const { compVisible } = this.state;
    const { btnList, treeData, selectedKeys, checkedKeys,
      defaultExpandedKeys, fetching } = this.props;
    return (
      <div>
        {/* <CompAdd parentCode={selectedKeys[0]} compVisible={compVisible} setCompVisible={this.setCompVisible}/> */}
        <Spin spinning={fetching}>
          <div className="tools-wrapper">
            {btnList.map(v => (
              <Button key={v.code} onClick={() => {
                this.handleBtnClick(v.url.substr(1));
              }}>{v.name}</Button>
            ))}
          </div>
          <div className="table-wrapper">
            {treeData.length ? (
              <Tree showLine
                checkable={true}
                checkStrictly={true}
                // defaultExpandedKeys={defaultExpandedKeys}
                // onSelect={this.onSelect}
                // onCheck={this.onSelect}
                // checkedKeys={checkedKeys}
                // selectedKeys={selectedKeys}
              >
                {this.renderTreeNodes(treeData)}
              </Tree>
            ) : null}
          </div>
        </Spin>
      </div>
    );
  }
}

export default CompConstruct;
