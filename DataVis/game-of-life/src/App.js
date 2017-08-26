import React from 'react';

import './App.css';
//TODO: Add live cells on click of cells.
//TODO: Multiple UI improvements needed
//TODO: Add corner cases: Horizontal , and vertical.

//Helper function to initialize matrix.
const Matrix = (rows, cols) => {
    let arr = [];
    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < cols; j++)
            arr[i][j] = -1;
    }
    return arr;
}

//Helper function to initialise state for the main component
//when page loads. This has the value of all the live cells in 
//the board. Returns an array 
//WORKS PERFECTLY , commenting for testing.
const firstGeneration = (rows, cols) => {
    let randomRows = generateRandom(rows, rows - 10);
    let randomCols = generateRandom(cols, cols - 10);
    let liveCells = [];
    randomRows.forEach(v =>
        randomCols.forEach(k => liveCells.push(v + "," + k))
    )
    return liveCells;
}

//Helper function to generate random values , returns an array 
// with the random values.
const generateRandom = (num, length) => {
    let randomArray = [];
    while (randomArray.length < length) {
        let val = Math.floor(Math.random() * num);
        if (randomArray.includes(val))
            continue;
        else
            randomArray.push(val)
    }
    return randomArray;
}

class App extends React.Component {


        constructor() {
            super();
            this.neighbours = [
                [-1, 0],
                [-1, 1],
                [0, 1],
                [1, 1],
                [1, 0],
                [1, -1],
                [0, -1],
                [-1, -1]
            ];
            this.small = Matrix(30, 50);
            this.medium = Matrix(70, 50);
            this.large = Matrix(100, 80);
            this.liveCells = firstGeneration();
            this.state = {
                board: this.small,
                liveCells: ["14,25", "14,26", "14,27"],
                generationGap: 125
            }

            this.willLive = this.willLive.bind(this);
            this.getNeighbours  = this.getNeighbours.bind(this);
            this.simulateNextGeneration = this.simulateNextGeneration.bind(this);
            this.nextGeneration = this.nextGeneration.bind(this);
            
           
        }


        //Using react component lifecycle method to set an interval to
        //function that simulates generations when component loads initially.
        componentDidMount() {
            console.log('componentDidMount')
            this.interval = setInterval(this.simulateNextGeneration, this.state.generationGap);
        }

        componentWillMount() {
            console.log('componentWillMount')
           if(this.interval)
            clearInterval(this.interval)
        }

        //Helper method to simulate next generation of live / dead cells
        //Currently built to handle two things:
        // -> Check whether current live cells will live
        // -> Check whether neighbours of current live cells will get new life.
        //    (Doesn't check same cell twice for life)
        simulateNextGeneration() {
            let liveCells = this.state.liveCells;
            var newLiveCells = [];
            var deadNeighbours = this.getNeighbours(liveCells,-1);
            //Checking if each live cell will live or die in the next generation
            this.nextGeneration(liveCells,newLiveCells,true)
            //Checking if new cells are born from previous generations live cells DEAD  neighbours.
           this.nextGeneration(deadNeighbours,newLiveCells,false)
            this.setState({
                liveCells: newLiveCells
            })
        }

        nextGeneration(cellsArr,newLiveCells,type) {
            cellsArr.forEach ( (v,i) => {
                if(this.willLive(v,type))
                    newLiveCells.push(v);
            })
   
        }



        //Checks if an already living cell will continue living or will die
        //by testing it's neighbours (in a clockwise manner)
        willLive(cell,isLiveCell) {
            let index = cell.split(',');
            let row = Number(index[0]);
            let col = Number(index[1]);
            let liveadj = 0;
            let board = this.state.board;
            this.neighbours.forEach(val => { let curRow = row + val[0]
                let curCol = col + val[1];
                if( this.state.liveCells.includes(curRow + ',' + curCol )  )
                                                liveadj++ })
            return isLiveCell? liveadj === 2 : liveadj === 3;
        }
    
        //FIXME: Doesn't get correct deadneighbours.
    getNeighbours(cells,which) {
        let neighbours = [];
        cells.forEach(cell => {
            let index = cell.split(',');
            let row = index[0];
            let col = index[1];
            var nRow,nCol;
            this.neighbours.forEach(function(val) {
                nRow = Number(row) + val[0];
                nCol = Number(col) + val[1];
                if (!cells.includes(nRow+','+nCol) && !neighbours.includes(nRow + ',' + nCol) )
                    neighbours.push(nRow + ',' + nCol)
            })
        })

    return neighbours;
    }

                render() {
                        return ( <div className = "App" >
                            <div className = "wrapper" > {
                                this.state.board.map((r, i) => {
                                        return (

                                            <  div className = "row"
                                            key = { i }
                                            id = { i } > {
                                                r.map((e, j) => < div className = { this.state.liveCells.includes(i+','+j) ? "cell live" : "cell dead" }
                                                    key = { i + "" + j }
                                                    id = { i + "" + j } > </div>)} 
                                                  </div> 
                                                )
                                            })
                                    } </div> 
                                    </div>
                                );
                            }
                        }

                    
                        export default App;