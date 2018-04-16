import React, { Component } from 'react'
import { connect } from 'dva';
import { Row, Col,Input,Select,Button,Icon,Card,Tag   } from 'antd';


@connect(({ drag }) => ({
  drag,
}))
export default class Properties extends Component{
  renderProperties = ()=>{
    const { drag: {properties, currentKey} } = this.props;
    let currentProperties = properties.find((item)=>{
      return currentKey == item.key;
    });
    if(!currentProperties) currentProperties = {};
    let keys = Object.keys(currentProperties);
    return (
      keys.map((key)=>{
        return <div key={key}>
          <Input addonBefore={key} value={currentProperties[key]}  onChange={(obj)=> this.handleInputChange(obj,currentKey)}/>
        </div>
      })
    )
  }

  handleInputChange = (obj, key)=>{
    const { drag: {properties} } = this.props
    let properties2 = properties.map((item)=>{
      if(item.key == key){
        return { key: key, value: obj.target.value};
      }
      return item;
    });
    this.props.dispatch({
      type: 'drag/saveProp',
      payload: properties2,
    });
  }


  render(){
    return (
      <div>
        {this.renderProperties()}
      </div>
    )
  }
}
