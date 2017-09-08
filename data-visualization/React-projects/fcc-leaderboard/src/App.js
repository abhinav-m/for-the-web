import React from 'react'
import './App.css'







const RowData = (props) => <tr className="dataRow">
  <td className="index">{props.idx}</td>
  <td ><img className="logo" src={props.content.img} /></td>
  <td className="userArea">{props.content.username}</td>
  <td className="points">{props.content.alltime}</td>
  <td className="points">{props.content.recent}</td>
</tr>

class TableData extends React.Component {

  render() {
     if(this.props.datashown.length===0)
       return (
      
      <div>  LOADING . . .</div>
      
    )
  else

    return (
      <table className="dataTable">
        <tbody>
          <tr className="dataRow">
            <th>#</th>
            <th>Logo</th>
            <th >User</th>
            <th>Points (All time)</th>
            <th>Points (Last 30 days)</th>
          </tr>
          {this.props.datashown.map((content, i) => <RowData key={i + 1} idx={i + 1} content={content} />)}
        </tbody>
      </table>)
  }
}



class DataSection extends React.Component {

  render() {
   
    return (

      <div className="dataSection">
        <TableData datashown={this.props.datashown} />
      </div>
    );
  }
}


class HeaderToggle extends React.Component {
  constructor() {
    super();
    this.state = {
      datashown: "recent"
    }
  }

  isActive(arg) {

    if (this.props.shown === arg)
      return "selected"
    else
      return "toggleButtons"

  }

  render() {
    return (
      <div className="headerToggle">
        <Button dClass={this.props.datashown==="all"?"selected":"toggleButtons"} name="All Time" click={this.props.setAll} />
        <Button dClass={this.props.datashown==="recent"?"selected":"toggleButtons"} name="Past 30" click={this.props.setRecent} />
      </div>
    );
  }

}

const Button = (props) => <div onClick={props.click} className={props.dClass}> {props.name} </div>


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      allData: [],
      recentData: [],
      shownData: [],
      shown: "recent"
    }
    this.setRecent = this.setRecent.bind(this);
    this.setAll = this.setAll.bind(this);
  }



  componentDidMount() {

    const allURL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    const recentURL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    const that = this;
    var xHttpReqRecent = new XMLHttpRequest();
    var xHttpReqAll = new XMLHttpRequest();
    xHttpReqRecent.open("GET", recentURL);
    xHttpReqRecent.send();

    xHttpReqAll.open("GET", allURL);
    xHttpReqAll.send();

    xHttpReqRecent.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
        that.setState({ recentData: data, shownData: data });
      }

    }


    xHttpReqAll.onreadystatechange = function () {
      if (xHttpReqAll.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
        that.setState({ allData: data });
      }
    }



  }


  setAll() {
    this.setState({
      shownData: this.state.allData,
      shown: "all"
    })
  }

  setRecent() {
    this.setState({
      shownData: this.state.recentData,
      shown: "recent"
    }
    )
  }
  render() {
    
    return (
    
      <div className="content">
       
       <h1> FCC LEADERBOARD</h1>
      <HeaderToggle setAll={this.setAll} setRecent={this.setRecent} datashown={this.state.shown} />
        <DataSection datashown={this.state.shownData} />
        <div className="signature">
<p ><i className="fa fa-heart" aria-hidden="true"></i></p>
<p ><a href="https://github.com/abhinav-thinktank">Abhinav Mishra</a></p>
<p ><a href="https://github.com/abhinav-thinktank">अभिनव मिश्रा</a></p>
</div>
      </div>
    )
  }
}



export default App;