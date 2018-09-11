import React from 'react';
import {
    Select
} from 'antd';
import fetch from 'common/js/fetch';
import './erweima.css';
var Barcode = require('react-barcode');

const Option = Select.Option;
export default class SelectSizesDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
            message: '',
            obj: '',
            data: [],
            BCoptions: {
                width: 300,
                height: 100
            }
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
                arr.push(<Option
                    key={data.list[i].code}>{`${data.list[i].code}-${data.list[i].customerName || data.list[i].userName}`}</Option>);
            }
            this.setState({
                children: arr,
                data: data.list
            });
        });
    }

    handleChange = (value) => {
        let data = this.state.data;
        let len = data.length;
        let flag = '';
        let code = value;
        for (let j = 0; j < len; j++) {
            if (value === data[j].code) {
                flag = data[j].type;
                continue;
            }
        }
        this.setState({
            obj: flag + code,
            BCoptions: {
                ...this.state.BCoptions
            }
        });
    }
    click = () => {
        // if (!this.state.obj) {
        //         //     showWarnMsg('请选择一条记录');
        //         //     return;
        //         // }
        let jsbar = document.getElementById('jsbar');
        let svgXml = jsbar.innerHTML;

        // 给图片对象写入base64编码的svg流
        var img = new Image();
        let imgData = 'data:image/svg+xml;' + window.btoa(unescape(encodeURIComponent(svgXml)));
        img.src = imgData;

        // 准备空画布
        let canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 142;

        // 取得画布的2d绘图上下文
        let context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        let download = document.getElementById('download');
        let url = canvas.toDataURL('image/jpeg');
        download.setAttribute('href', url);
        download.click();
    }

    getStyle = (el, name) => {
        if(window.getComputedStyle) {
            return window.getComputedStyle(el, null);
        }else{
            return el.currentStyle;
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Select
                        placeholder="Please select"
                        onChange={this.handleChange}
                        style={{width: '100%'}}
                    >
                        {this.state.children}
                    </Select>
                </div>
                <div className="jsbar" id="jsbar" style={{overflow: 'hidden'}}>
                    <Barcode options={this.state.BCoptions} value={this.state.obj}/>
                </div>
                <a id="download" download="条形码"></a>
                <button id="save" onClick={this.click}>点击下载</button>
            </div>
        );
    }
}