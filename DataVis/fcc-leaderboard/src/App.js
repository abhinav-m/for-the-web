import React from 'react'
import './App.css'


const allURL= "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
const recentURL ="https://fcctop100.herokuapp.com/api/fccusers/top/recent";
var allData;
var recentData;

class CamperData extends React.component {

  render() {
    return(
      <tr>
        <td>{this.state.id}</td>
        <td>{this.state.picture}</td>
        <td>{this.state.Name}</td>
        <td>{this.state.Points}</td>
      </tr>
    )
  }

}

class TableData extends React.Component {
  render() {
   return( <table className="dataTable">
      {camperData}
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
 
constructor(){
  
}
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
      </div>
    )
  }
}

function loadDataAsync(url) {
  var myObjArray = [];
  var xHttpReq = new XMLHttpRequest();
  xHttpReq.onreadystatechange = function () {
    if(this.readyState == 4 && this.status==200)
      myObjArray = this.responseText;
  }
  xHttpReq.open("GET",url);
  xHttpReq.send();
  return myObjArray;
}


export default App;