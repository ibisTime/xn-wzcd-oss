import React from 'react';
import {
  Select,
  Radio,
  Alert
} from 'antd';
import fetch from 'common/js/fetch';
import './erweima.css';
var QRCode = require('qrcode.react');

const Option = Select.Option;
export default class SelectSizesDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      message: '',
      obj: '',
      data: []
    };
  }

  componentDidMount() {
    fetch(632155, {
      start: 0,
      limit: 100,
      status: '1'
    }).then(data => {
      let len = data.list.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        arr.push(<Option key={data.list[i].code}>{`${data.list[i].code}-${data.list[i].customerName || data.list[i].userName}`}</Option>);
      }
      console.log(arr);
      this.setState({
        children: arr,
        data: data.list
      });
    });
  }

  handleChange = (value) => {
    let length = value.length;
    let data = this.state.data;
    let len = data.length;
    let codeList = [];
    let flag = '';
    for(let i = 0; i < length; i++) {
      for(let j = 0; j < len; j++) {
        if(value[i] === data[j].code) {
          codeList.push(data[j]);
          flag = data[j].type;
          continue;
        }
      }
    }
    for(let k = 0; k < codeList.length; k++) {
      if(codeList[k].type !== flag) {
        this.setState({
          message: '请选择同一类型的物流单'
        });
        return;
      }
    }
    let arr1 = [];
    for(let q = 0; q < codeList.length; q++) {
      arr1.push(codeList[q].code);
    }
    let obj = {'type': flag, 'codeList': arr1};
    let jsonstr = JSON.stringify(obj);
    this.setState({
      obj: jsonstr
    });
  }
  click = () => {
    let erweima = document.getElementById('erweima');
    let download = document.getElementById('download');
    let canvas = erweima.getElementsByTagName('canvas')[0];
    var url = canvas.toDataURL('image/jpeg');
    download.setAttribute('href', url);
    download.click();
  }

  render() {
    const {
      size
    } = this.state;
    return (
      <div>
        <div>
            <Select
            mode="multiple"
            size={size}
            placeholder="Please select"
            onChange={this.handleChange}
            style={{ width: '100%' }}
          >
            {this.state.children}
          </Select>
        </div>
        <Alert message={this.state.message} type="warning" />
        <div className="erweima" id="erweima">
          <QRCode size={150} value={this.state.obj}/>
        </div>
        <a id="download" download="erweima"></a>
        <button id="save" onClick={this.click}>点击下载</button>
      </div>
    );
  }
}