import React from 'react'
import './App.css'







const RowData = (props) => <tr className="dataRow">
  <td>{props.idx}</td>
        <td><img className="logo" src={props.content.img}/></td>
        <td>{props.content.username}</td>
        <td>{props.content.alltime}</td>
        <td>{props.content.recent}</td>
</tr>

class TableData extends React.Component {
  constructor() {
    super();
    this.state = {
      allData: [],
      recentData: [],
      shownData:[]
    }
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
  render() {

   return(
    <table className="dataTable">
     <tbody>
      {this.state.shownData.map( (content,i) => <RowData key={i+1} idx={i+1} content={content} />)}
      </tbody>
    </table>)
  }
}



class DataSection extends React.Component {

  render() {
    return(
      <div className = "dataSection">
        <TableData/>
        </div>
    );
  }
}


class HeaderToggle extends React.Component {
 

  render() {
    return(
      <div className = "headerToggle">
        <Button name="All Time"/>
        <Button name="Past 30"/>
        </div>
    );
    }

}




const Button = (props) => <div className="toggleButtons"> {props.name} </div>


//These are objects , React can't render objects directly, it instantiates each
//class on ReactDOM.render() call
/* const AllButton = <Button name="All Time"/>
const PastThirty  = <Button name="Past 30"/> */

class App extends React.Component {
  render() {
    return(
    <div className="content">
      <HeaderToggle/>
      <DataSection/>
      </div>
    )
  }
}



export default App;