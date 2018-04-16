import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { connect } from 'dva';
import { Row, Col,Input,Select,Button,Icon,Card,Tag   } from 'antd';
const Option = Select.Option;

const style = {
  minHeight:'500px',
	height: '12rem',
	width: '100%',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

const boxTarget = {
	drop(props, monitor, component) {
    const item = monitor.getItem()
    console.log(props);
    props.dispatch({
      type: 'drag/save',
      payload: item,
    });


		return { name: 'Dustbin' }
	},
}

@connect(({ drag }) => ({
  drag,
}))
@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	}

	state = {
    showD: {},
    currentKey: "",
  }
  handleInputChange = (obj, key)=>{
	  console.log(obj.target.value)
    const { drag: {properties} } = this.props
    let properties2 = properties.map((item)=>{
      if(item.key == key){
        return {key: key, value: obj.target.value};
      }
      return item;
    });
    console.log(properties2)
    this.props.dispatch({
      type: 'drag/saveProp',
      payload: properties2,
    });
  }


  handleEvent = (key)=>{
	  let map = {};
    map[key] = true;
    this.setState({
      showD: map,
      currentKey: key,
    });

    this.props.dispatch({
      type: 'drag/saveCommon',
      payload: {currentKey: key},
    });

  }
  onDelete = (key) =>{
    this.props.dispatch({
      type: 'drag/delete',
      payload: key,
    });
  }
	renderForm = ()=> {
    const { drag: {data, properties} } = this.props
    let table = [];
    let row = [];
    data.forEach((item,index)=>{
      if(index != 0 && index % 3 == 0){
        table.push(row);
        row = [];
      }
      row.push(item);
    });
    if(row.length > 0) table.push(row);

    return (
      table.map((row, index)=>{
        return (
          <Row key={index} gutter={8} style={{marginBottom:18}}>
            {
              row.map((item)=>{
                let currentProperties = properties.find((prop)=>{
                  return prop.key == item.key;
                });
                if(item.name == "input"){
                  return (
                      <Col key={item.key} span={8}>
                        <div onClick={(obj)=> this.handleEvent(item.key)}>
                          <Input addonBefore={item.name} value={currentProperties.value}  onChange={(obj)=> this.handleInputChange(obj,item.key)}/>
                          {this.state.showD[item.key] && <Icon type="delete" onClick={()=>this.onDelete(item.key)}/>}
                        </div>
                      </Col>
                  )
                }
                if(item.name == "select"){
                  return (
                      <Col key={item.key} span={8}>
                        <div onClick={(obj)=> this.handleEvent(item.key)}>
                          <Select defaultValue="lucy" style={{width:"100%"}}>
                            <Option value="lucy">Lucy</Option>
                          </Select>
                          {this.state.showD[item.key] && <Icon type="delete" onClick={()=>this.onDelete(item.key)}/>}
                        </div>
                      </Col>
                  )
                }
                if(item.name == "button"){
                  return (
                      <Col key={item.key} span={8}>
                        <div onClick={(obj)=> this.handleEvent(item.key)}>
                          <Button type="primary">Primary</Button>
                          {this.state.showD[item.key] && <Icon type="delete" onClick={()=>this.onDelete(item.key)}/>}
                        </div>
                      </Col>
                  )
                }
              })
            }
          </Row>
        )
      })
    );
  }

	render() {
		const { canDrop, isOver, connectDropTarget,drag } = this.props
		const isActive = canDrop && isOver
		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return connectDropTarget(
			<div style={{ ...style, backgroundColor }}>
				{isActive ? 'Release to drop' : 'Drag a box here'}
        {this.renderForm()}
			</div>,
		)
	}
}
