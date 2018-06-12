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
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
          Welcome to the
            <strong>London Beer Bar club
              {this.props.name === '' ? '' : `, ${this.handleCapitalize()}`}!
            </strong>
          {this.props.handleLoadMore && <Button type="primary" icon="download" style={{ position: 'absolute', right: '10px', top: '10px' }} onClick={this.props.handleLoadMore}>Load More Beers</Button>}
        </h1>
      </div>
    )
  }
};
