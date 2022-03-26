import React, { Component } from 'react';
import DataSection from '../components/DataSection';

class DataContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      recentData: [],
      shownData: [],
      active: 'recent'
    };
    this.setRecent = this.setRecent.bind(this);
    this.setAll = this.setAll.bind(this);
  }

  componentDidMount() {
    const allURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    const recentURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    const that = this;
    var xHttpReqRecent = new XMLHttpRequest();
    var xHttpReqAll = new XMLHttpRequest();
    xHttpReqRecent.open('GET', recentURL);
    xHttpReqRecent.send();

    xHttpReqAll.open('GET', allURL);
    xHttpReqAll.send();

    xHttpReqRecent.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        that.setState({ recentData: data, shownData: data });
      }
    };

    xHttpReqAll.onreadystatechange = function() {
      if (xHttpReqAll.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        that.setState({ allData: data });
      }
    };
  }

  setAll() {
    this.setState({
      shownData: this.state.allData,
      active: 'all'
    });
  }

  setRecent() {
    this.setState({
      shownData: this.state.recentData,
      active: 'recent'
    });
  }
  render() {
    return (
      <DataSection
        setAll={this.setAll}
        setRecent={this.setRecent}
        data={this.state.shownData}
        active={this.state.active}
      />
    );
  }
}

export default DataContainer;
