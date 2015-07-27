import React from 'react'
import Sudoku from './Sudoku'

import {parse, solve} from './solver'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { values: parse('..53.....8......2..7..1.5..4....53...1..7...6..32...8..6.5....9..4....3......97..') }
  }

  solve(values) {
    let result = solve(values)

    if (result) {
      this.setState({values: result})
    }
  }

  render() {
    let onChange = (values) => this.setState({values: values})
    let onClick = () => this.solve(this.state.values)

    return (
      <div className='pure-g'>
        <div className='pure-u-1'>
          <h1>sudoku-solver.js</h1>
        </div>
        <div className='pure-u-1'>
          <Sudoku values={this.state.values} onChange={onChange} />
        </div>
        <div className='pure-u-1'>
          <div className='solve-button-container'>
            <a className='solve-button pure-button' onClick={onClick}>solve</a>
          </div>
        </div>
      </div>
    )
  }
}
