import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, List, Avatar, message } from 'antd';
import * as actions from '../actions'
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;

class Cart extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleCartCheck = () => {
        if (this.props.cart.length === 0) {
            message.error("Sorry, your cart is empty!")
        }
    }
    componentDidMount = () => {
      this.handleCartCheck();
    };
    
    componentWillReceiveProps = (nexProps) => {
       this.handleCartCheck();
    }
    renderBill = () => {
        let sum = 0;
        this.props.cart.map(curr => {
            let nextPrice = Number(curr.price.split('£').join(''));
            sum += nextPrice;
            return true;
        })
        return sum;
    }
    render() {
        return (
            <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Link to='/'>
                                <Icon type="left" />
                                <span className="nav-text">Go Back</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <h1 class='responsive-header' style={{textAlign: 'center'}}>
                            Your Cart £ 

                                {this.props.cart.length > 0 ? 
                                this.renderBill() : 0}
                        </h1>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={this.props.cart}
                            renderItem={item => (
                                <List.Item actions={[<a onClick={() => this.props.removeItem(item)}>Remove</a>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://picsum.photos/${60+ Math.floor(Math.random() * 60)}`} />}
                                        title={item.brewery}
                                        description={item.beer}
                                    />
                                    <div style={{marginRight: '10px'}}>Price: {item.price} </div>
                                    <div>Size : {item.size} </div>
                                </List.Item>
                            )}
                        />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        &copy; London Beer Bar INC 2017 
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
let mapStateToProps = ({ cart }) => ({
    cart,
})
export default connect(mapStateToProps, actions)(Cart);
