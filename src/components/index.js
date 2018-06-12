import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Badge, Spin, Card, Menu, Rate, message, Icon, Avatar, Modal, Input } from 'antd';
import { NewsHeaderCard } from 'react-ui-cards';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import 'antd/dist/antd.css';
import './index.css';
import HeaderComponent from './HeaderComponent';

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;
const  { Meta } = Card;

class Main extends Component {
    state = {
        collapsed: true,
        modalVisible: false,
        name: '',
        loading: true,
        cartModal: false,
        currentItems: 8
    };
    componentDidMount = () => {
        this.props.loadItems();
        
        if(!this.props.tutorialFinished) {
            let parent = Modal.confirm({
                content: 'Here\'s a small tutorial to get you started!',
                iconType: 'info',
                okText: 'Next ',
                title: 'Tutorial',
                onOk: () => {
                    parent.destroy();
                    let first_child = Modal.confirm({
                        content: 'Browse through list of available beers for London Beer Fans!',
                        iconType: 'info',
                        okText: 'Next ',
                        title: 'London Beer Fan Club',
                        onOk: () => {
                            first_child.destroy();
                            let second_child = Modal.confirm({
                                content: 'We have some unique beers of limited availability. Click on any beer to know how much of those are in stock!',
                                iconType: 'coffee',
                                okText: 'Next ->',
                                title: 'Fear of missing out?',
                                onOk: () => {
                                    second_child.destroy();
                                    let third_child = Modal.confirm({
                                        content: 'Add beers to your cart, and order them using online payment or Cash-On-Delivery!',
                                        iconType: 'coffee',
                                        okText: 'Next ->',
                                        title: 'Free home deliveries!',
                                        onOk: () => {
                                            third_child.destroy();
                                            message.success('Congratulations! You know enough about our site, start exploring beers!')
                                            this.setState({
                                                modalVisible: true,
                                            })
                                            this.props.completedTutorial();
                                        },
                                        onCancel: () => {
                                            message.error('Cancelling tutorial. We hope that you\'re aware how this site works.')
                                            third_child.destroy();
                                            this.setState({
                                                modalVisible: true,
                                            })
                                            this.props.completedTutorial();
                                        }
                                    })
                                },
                                onCancel: () => {
                                    message.error('Cancelling tutorial. We hope that you\'re aware how this site works.')
                                    second_child.destroy();
                                    this.setState({
                                        modalVisible: true,
                                    })
                                    this.props.completedTutorial();
                                }
                            })
                        },
                        onCancel: () => {
                            message.error('Cancelling tutorial. We hope that you\'re aware how this site works.')
                            first_child.destroy();
                            this.setState({
                                modalVisible: true,
                            })
                            this.props.completedTutorial();
                        }
                    })
                },
                onCancel: () => {
                    message.error('Cancelling tutorial. We hope that you\'re aware how this site works.')
                    parent.destroy();
                    this.setState({
                        modalVisible: true,
                    })
                    this.props.completedTutorial();
                }
            });
        }
    
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    handleLoadClick = () => {
        this.setState({ loading: true,})
        this.props.loadItems();
    }
    setModalVisible(modalVisible) {
        if(modalVisible === false) {
            if(this.state.name === '') {
                message.error('Please enter your Name!');
                return this.setModalVisible(true);
            }
        }
        this.setState({ modalVisible, loading: false });
    }
    setCartModalVisible = (flag) => {
        this.setState({
            cartModal: flag
        })
    }
    handleAddToCard = (curr) => {
        let flag = false;
        this.props.cart.map(item => {
            if(item.beer === curr.beer) flag = true;
            return true;
        });
        if(flag) {
            return message.error('Your cart already has this item!');
        } 
        confirm({
            title: `Do you Want to add ${curr.beer} to cart?`,
            content: `${curr.quantity_in_stock} left in stock!`,
            onOk: () => {
                this.props.addToCart(curr);
                message.success('Item added to cart!')
            },
            onCancel: () => {
                message.error('Item removed!')
            },
        });
    }
    handleChange = (e) => {
        let StateObj = Object.assign({}, this.state);
        StateObj.name = e.target.value;
        this.setState(StateObj);
    }
    render() {
        const loadingStyle = this.props.items.loading && this.state.loading ? 
        {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        } : {
                margin: '4px',
                backgroundColor: 'white'
            };
        return (
                <Layout style={{ overflow: 'hidden', marginLeft: '40px', height: '100%'}}>
                    <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', zIndex: 12, left: '0px' }}
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" onClick={this.handleLoadClick}>
                                <Link to='/'>
                                    <Icon type="coffee" />
                                    <span>Load Beers</span>
                                </Link>
                            </Menu.Item>
                        <Menu.Item key="2" onClick={() => this.setCartModalVisible(true)}>
                               <Link to='/cart'> 
                                <Icon type="shopping-cart" />
                                    <span>Open Cart</span>
                                    <Badge style={{zIndex: 15}} count={this.props.cart.length || 0} showZero offset={[-10, 10]} >
                                        <span className="head-example"> </span>
                                    </Badge>
                                </Link>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>User</span></span>}
                            >
                                <Menu.Item key="3" onClick={() => message.error('Sorry, Login under construction.')}>Login</Menu.Item>
                                <Menu.Item key="4" onClick={() => message.error('Sorry, Signup under construction as well!')}>Signup</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <HeaderComponent handleLoadMore={() => this.setState({ currentItems: this.state.currentItems + 8 })} name={this.state.name} />
                        <Content style={loadingStyle}>
                            {this.props.items.loading && this.state.loading && <Spin style={{zIndex: 100, position: 'absolute', top: '50%', left: '50%', translateX: '-50%'}} size='large' />}
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap:'wrap', justifyContent: 'space-around'}}>
                                {this.props.items.payload ? 
                                this.props.items.payload.data.slice(0, this.state.currentItems).map((curr, key) => (
                                    <div key={key} style={{position: 'relative', height: '280px', width: '300px', margin: '50px 5px' }} onClick={ () => this.handleAddToCard(curr)}>
                                        <NewsHeaderCard
                                            thumbnail={`https://picsum.photos/${key + 300}?blur`}
                                            title={curr.beer}
                                            author={curr.brewery}
                                            date={curr.price}
                                        />
                                        <div style={{ position: 'absolute', height: '100px', top: '30px', zIndex: 8, left: '50%', translateX: '-50%' }}>
                                            <Rate allowHalf value={curr.average_review_rating_0_to_5} />
                                        </div>
                                    </div>  
                                    )
                                  ) : null
                                }
                            </div>
                        </Content>
                        <Modal
                            title="Hello London Beer Fan!"
                            wrapClassName="vertical-center-modal"
                            visible={this.state.modalVisible}
                            onOk={() => this.setModalVisible(false)}
                            onCancel={() => this.setModalVisible(false)}
                        >
                            <h2>Please enter your name to get started!</h2>
                            <Input autoFocus onChange={this.handleChange} placeholder='Your name...' />
                        </Modal>
                    <Modal
                        title="Beer Cart"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.cartModal}
                        style={{overflow: 'scroll'}}
                        onOk={() => this.setCartModalVisible(false)}
                        onCancel={() => this.setCartModalVisible(false)}
                    >
                    <div className="card-container">
                        {
                            this.props.cart.map((curr, index) => {
                                return (
                                    <Card
                                        key={index}
                                        style={{ width: 300 }}
                                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Card>
                                )
                            })
                        }
                    </div>
                    </Modal>
                    <Footer style={{ textAlign: 'center', marginTop: '30px' }}>
                        &copy; London Beer Bar INC 2017 
                    </Footer>
                    </Layout>
                </Layout>
        );
    }
}

let mapStateToProps = ({ items, cart, tutorialFinished }) => ({
    items,
    cart,
    tutorialFinished
})

export default connect(mapStateToProps, actions)(Main);

