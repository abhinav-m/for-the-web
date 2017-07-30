import React from 'react'
import './App.css'







const RowData = (props) => <tr className="dataRow">
  <td className="index">{props.idx}</td>
        <td ><img className="logo" src={props.content.img}/></td>
        <td className = "userArea">{props.content.username}</td>
        <td className ="points">{props.content.alltime}</td>
        <td className ="points">{props.content.recent}</td>
</tr>

class TableData extends React.Component {
 
  render() {

   return(
    <table className="dataTable">
     <tbody>
      {this.props.datashown.map( (content,i) => <RowData key={i+1} idx={i+1} content={content} />)}
      </tbody>
    </table>)
  }
}



class DataSection extends React.Component {

  render() {
    return(
      <div className = "dataSection">
        <TableData datashown={this.props.datashown}/>
        </div>
    );
  }
}


class HeaderToggle extends React.Component {
 

  render() {
    return(
      <div className = "headerToggle">
        <Button name="All Time" click={this.props.setAll}/>
        <Button name="Past 30" click={this.props.setRecent}/>
        </div>
    );
    }

}

const Button = (props) => <div onClick={props.click} className="toggleButtons"> {props.name} </div>

class App extends React.Component {

   constructor() {
    super();
    this.state = {
      allData: [],
      recentData: [],
      shownData:[]
    }
    this.setRecent = this.setRecent.bind(this);
     this.setAll = this.setAll.bind(this);
  }



  componentDidMount() {

    const allURL= "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    const recentURL ="https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    const  that =this;
  var xHttpReqRecent = new XMLHttpRequest();
  var xHttpReqAll = new XMLHttpRequest();
  xHttpReqRecent.open("GET",recentURL);
  xHttpReqRecent.send();

  xHttpReqAll.open("GET",allURL);
  xHttpReqAll.send();

  xHttpReqRecent.onreadystatechange = function () {
    if(this.readyState == 4 && this.status==200)
      {
      var data = JSON.parse(this.responseText);
     that.setState({recentData:data,shownData:data});
      }
    
  }
    

  xHttpReqAll.onreadystatechange = function () {
     if(xHttpReqAll.readyState == 4 && this.status==200)
      {
     var  data = JSON.parse(this.responseText);
     that.setState({allData:data});
      }
  }


  
  }
   
  
  setAll() {
    this.setState({
      shownData:this.state.allData
    })
  }

  setRecent() {
    this.setState({
      shownData:this.state.recentData
    }
    )
  }
  render() {
    return(
    <div className="content">
      FCC LEADERBOARD
      <HeaderToggle setAll={this.setAll} setRecent={this.setRecent}/>
      <DataSection datashown={this.state.shownData}/>
      </div>
    )
  }
}



export default App;