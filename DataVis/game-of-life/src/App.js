import React from 'react';

import './App.css';
//TODO: Add dead cells on click of live cells.
//TODO: Multiple UI improvements needed
//TODO: Add multiple sizes functionality.
//Check responsiveness
//FIXME: F

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
        this.liveCells = firstGeneration(30, 50);
        this.state = {
            board: this.small,
            liveCells: this.liveCells,//["0,25","0,26","0,27","14,25", "14,26", "14,27","15,0","16,0","17,0"],
            generationGap: 50,
            isPaused: false,
            generation: 1
        }

        this.willLive = this.willLive.bind(this);
        this.getNeighbours = this.getNeighbours.bind(this);
        this.simulateNextGeneration = this.simulateNextGeneration.bind(this);
        this.nextGeneration = this.nextGeneration.bind(this);
        this.changeCellState = this.changeCellState.bind(this);
        this.wrapValue = this.wrapValue.bind(this)
        this.stopSimulation = this.stopSimulation.bind(this)
        this.startSimulation = this.startSimulation.bind(this)
        this.pause = this.pause.bind(this)
        this.clearBoard = this.clearBoard.bind(this)

    }


    //Using react component lifecycle method to set an interval to
    //function that simulates generations when component loads initially.
    componentDidMount() {
        console.log('componentDidMount')
        this.startSimulation();
    }

    componentWillMount() {
        console.log('componentWillMount')
        //clear any previous interval if already set.
        if (this.interval)
            this.stopSimulation();
    }

    //Helper method to simulate next generation of live / dead cells
    //Currently built to handle two things:
    // -> Check whether current live cells will live
    // -> Check whether neighbours of current live cells will get new life.
    //    (Doesn't check same cell twice for life)
    simulateNextGeneration() {
        let liveCells = this.state.liveCells;
        var newLiveCells = [];
        var deadNeighbours = this.getNeighbours(liveCells, -1);

        if (deadNeighbours.includes('29,26'))
            console.log('test')
        //Checking if each live cell will live or die in the next generation
        this.nextGeneration(liveCells, newLiveCells, true)
        //Checking if new cells are born from previous generations live cells DEAD  neighbours.
        this.nextGeneration(deadNeighbours, newLiveCells, false)
        let nextGen = this.state.generation + 1;
        this.setState({
            liveCells: newLiveCells,
            generation: nextGen
        })
    }

    startSimulation() {
        this.interval = setInterval(this.simulateNextGeneration, this.state.generationGap);
    }

    stopSimulation() {
        clearInterval(this.interval)
    }

    pause() {
        if (this.state.isPaused)
            this.startSimulation();
        else {
            this.stopSimulation();
        }
        let pauseStatus = !this.state.isPaused;
        this.setState({
            isPaused: pauseStatus
        })
    }

    nextGeneration(cellsArr, newLiveCells, type) {
        cellsArr.forEach((v, i) => {
            if (this.willLive(v, type))
                newLiveCells.push(v);
        })

    }

    //Checks if a cell will continue living or will die
    //by testing it's neighbours (in a clockwise manner)
    willLive(cell, isLiveCell) {
        let index = cell.split(',');
        let row = Number(index[0]);
        let col = Number(index[1]);
        let liveadj = 0;
        let maxRows = this.state.board.length;
        let maxCols = this.state.board[0].length;
        this.neighbours.forEach(val => {
            let curRow = row + val[0]
            let curCol = col + val[1];
            if (curRow === maxRows || curRow < 0)
                curRow = this.wrapValue(curRow, maxRows)
            if (curCol === maxCols || curCol < 0)
                curCol = this.wrapValue(curCol, maxCols)
            if (this.state.liveCells.includes(curRow + ',' + curCol))
                liveadj++
        })
        return isLiveCell ? liveadj === 2 || liveadj === 3 : liveadj === 3;
    }

    //This is a helper function to get the neighbours of cells.
    //which is a parameter which is passed -1 to get the dead neighbours. 
    getNeighbours(cells, which) {
        let neighbours = [];
        var maxRows = this.state.board.length;
        var maxCols = this.state.board[0].length;
        cells.forEach(cell => {
            let index = cell.split(',');
            let row = index[0];
            let col = index[1];
            var nRow, nCol;
            this.neighbours.forEach((val) => {
                nRow = Number(row) + val[0];
                nCol = Number(col) + val[1];
                if (nRow === maxRows || nRow < 0)
                    nRow = this.wrapValue(nRow, maxRows)
                if (nCol === maxCols || nCol < 0)
                    nCol = this.wrapValue(nCol, maxCols)
                if (!cells.includes(nRow + ',' + nCol) && !neighbours.includes(nRow + ',' + nCol))
                    neighbours.push(nRow + ',' + nCol)
            })
        })
        return neighbours;
    }

    //Helper function to wrap the value to the edges of the matrix
    //in case edge cases exist.
    wrapValue(value, max) {
        return value < 0 ? max - 1 : 0
    }

    changeCellState(e) {
        let liveCells = this.state.liveCells;
        liveCells.push(e.target.id)
        this.setState({
            liveCells: liveCells
        })

    }

    clearBoard() {
        let emptyBoard = [];
        this.setState({
            liveCells: emptyBoard,
            generation: 0
        })
        this.stopSimulation();
    }


    render() {
        console.log('render')
        return (<div className="App" >
            {this.state.generation}
            <div onClick={this.pause} className='state-button'>{this.state.isPaused ? 'Start' : 'Stop'}</div>
            <div onClick={this.clearBoard} className='state-button'>Clear</div>
            <div className="wrapper" onClick={this.changeCellState}> {
                this.state.board.map((r, i) => {
                    return (

                        <  div className="row"
                            key={i}
                            id={i} > {
                                r.map((e, j) => < div className={this.state.liveCells.includes(i + ',' + j) ? "cell live" : "cell dead"}
                                    key={i + "" + j}
                                    id={i + "," + j} > </div>)}
                        </div>
                    )
                })
            } </div>
        </div>
        );
    }
}


export default App;