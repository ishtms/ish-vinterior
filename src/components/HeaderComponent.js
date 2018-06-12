import React, { Component } from 'react';
import {  Button } from 'antd';
import './index.css';

export default class HeaderComponent extends Component {
  handleCapitalize = () => {
    return this.props.name[0].toUpperCase() + this.props.name.split('').splice(1).join('')
  }
  render() {
    const divStyle = { 
      fontFamily: 'Lato',
      padding: '2px auto',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      background: '#1e90ff'
    }
    return (
      <div style={divStyle}>
        <h1 className='responsive-header' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
          Welcome to
            <strong> London Beer Club
              {this.props.name === '' ? '' : `, ${this.handleCapitalize()}`}!
            </strong>
        </h1>
        {this.props.handleLoadMore && <Button type="primary" icon="download" style={{ position: 'absolute', right: '10px', top: '10px' }} className='responsive-header__button' onClick={this.props.handleLoadMore}><span>Load More Beers</span></Button>}
      </div>
    )
  }
};
