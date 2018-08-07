import React from 'react';
import {
  Select,
  Radio
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
      str: ''
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
        arr.push(<Option key={data.list[i].bizCode}>{`${data.list[i].bizCode}-${data.list[i].customerName}`}</Option>);
      }
      console.log(arr);
      this.setState({
        children: arr
      });
    });
  }

  handleChange = (value) => {
    let codeList = [].concat(value);
    console.log(value);
    this.setState({
      str: codeList
    });
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
        <div class="erweima">
          <QRCode size={150} value={`[${this.state.str}]`}/>
        </div>
      </div>
    );
  }
}