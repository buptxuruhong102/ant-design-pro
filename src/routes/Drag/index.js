import React, { Component } from 'react'
import Container from './Container'
import Properties from './Properties'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default class DustbinSingleTarget extends Component {
	render() {
		return (
			<div>
        <Layout>
          <Layout>
            <Content>
              <Container />
            </Content>
            <Sider>
              <Properties/>
            </Sider>
          </Layout>
        </Layout>

      </div>
		)
	}
}
