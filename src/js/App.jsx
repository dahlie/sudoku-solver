import React from 'react'
import Sudoku from './Sudoku'

import { parse, validate, solve } from './solver'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { conflicts: new Map(), values: parse('..53.....8......2..7..1.5..4....53...1..7...6..32...8..6.5....9..4....3......97..') }
  }

  validate(values) {
    this.setState({conflicts: validate(values)})
  }

  solve(values) {
    let result = solve(values)

    if (result) {
      this.setState({values: result})
    }
  }

  render() {
    let onChange = (values) => this.setState({values: values})
    let onValidate = () => this.validate(this.state.values)
    let onSolve = () => this.solve(this.state.values)

    return (
      <div className='pure-g'>
        <div className='pure-u-1'>
          <h1>sudoku-solver.js</h1>
        </div>
        <div className='pure-u-1'>
          <Sudoku values={this.state.values} conflicts={this.state.conflicts} onChange={onChange} />
        </div>
        <div className='pure-u-1'>
          <div className='solve-button-container'>
            <a className='validate-button pure-button' onClick={onValidate}>validate</a>
            <a className='solve-button pure-button' onClick={onSolve}>solve</a>
          </div>
        </div>
      </div>
    )
  }
}
