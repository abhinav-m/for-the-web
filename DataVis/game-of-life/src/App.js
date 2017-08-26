import React from 'react';

import './App.css';

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
            this.currentBoard = this.small.map((v, i) => {
                return v.map((x, j) => this.liveCells.includes(i + "," + j) ? 1 : -1)
            })
            this.state = {
                board: this.currentBoard,
                liveCells: ["14,25", "14,26", "14,27"],
                generationGap: 1000
            }

            this.willLive = this.willLive.bind(this);
            this.getNeighbours  = this.getNeighbours.bind(this);
           
        }

        //Using react component lifecycle method to set an interval to
        //function that simulates generations when component loads initially.
        componentDidMount() {
            this.interval = setInterval(this.simulateNextGeneration, this.state.generationGap);
        }

        //Helper method to simulate next generation of live / dead cells
        //Currently built to handle two things:
        // -> Check whether current live cells will live
        // -> Check whether neighbours of current live cells will get new life.
        //    (Doesn't check same cell twice for life)
        simulateNextGeneration() {
            let liveCells = this.state.liveCells;
            let newCells = [];
            let neighbours = this.getNeighbours(liveCells);

            //Checking if each live cell will live or die in the next generation.
            liveCells.forEach((v, i) => {
                if (this.willLive(v))
                    newCells.push(v)
            })

        }

        //Checks if an already living cell will continue living or will die
        //by testing it's neighbours (in a clockwise manner)
        willLive(cell) {
            let index = cell.split(',');
            let row = index[0];
            let col = index[1];
            let liveadj = 0,
                deadadj = 0;
            let board = this.state.board;
            this.neighbours.forEach(val => board[row + val[0]][col + val[1]] === 1 ? liveadj++ : deadadj++)
            return liveadj === 2
        }

        getNeighbours(cells,which) {
                let neighbours = [];
                let board = this.state.board;
                cells.forEach(cell => {
                        let index = cell.split(',');
                        let row = index[0];
                        let col = index[1];
                        var nRow,nCol;
                        this.neighbours.forEach(function(val) {
                                nRow = row + val[0];
                                nCol = row + val[1];
                                if (board[nRow][nCol] === which && !neighbours.includes(nRow + ',' + nCol) )
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
                                                r.map((e, j) => < div className = { this.state.board[i][j] === 1 ? "cell live" : "cell dead" }
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