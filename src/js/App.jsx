import React from 'react'
import classNames from 'classnames'
import Sudoku from './Sudoku'

import { parse, validate, solve } from './solver'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conflicts: new Map(),
      pristine: false,
      valid: true,
      solutionFound: null,
      values: parse('..53.....8......2..7..1.5..4....53...1..7...6..32...8..6.5....9..4....3......97..') }
  }

  validate(values) {
    let conflicts = validate(values)

    this.setState({
      conflicts: conflicts,
      valid: conflicts.size === 0,
      pristine: true
    })

    return conflicts.size === 0
  }

  solve(values) {
    if (this.validate(values)) {
      let result = solve(values)

      this.setState({
        values: result || this.state.values,
        solutionFound: result != null
      })
    }
  }

  getValidateLabel() {
    if (this.state.pristine) {
      return this.state.valid ? 'valid' : 'invalid'
    } else {
      return 'validate'
    }
  }

  getValidateClasses() {
    return classNames({
      'validate-button': true,
      'pure-button': true,
      'is-valid': this.state.pristine && this.state.valid,
      'is-invalid': this.state.pristine && !this.state.valid
    })
  }

  getSolveLabel() {
    if (this.state.pristine && this.state.solutionFound != null) {
      return this.state.solutionFound ? 'solved' : 'no solution'
    } else {
      return 'solve'
    }
  }

  getSolveClasses() {
    let hasSolutionFlag = this.state.pristine && this.state.solutionFound != null

    return classNames({
      'solve-button': true,
      'pure-button': true,
      'is-valid': hasSolutionFlag && this.state.solutionFound,
      'is-invalid': hasSolutionFlag && !this.state.solutionFound
    })
  }

  render() {
    let onChange = (values) => this.setState({values: values, pristine: false})
    let onValidate = () => this.validate(this.state.values)
    let onSolve = () => this.solve(this.state.values)
    let onClear = () => this.setState({values: new Map(), solutionFound: null, pristine: false})

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
            <a className={this.getValidateClasses()} onClick={onValidate}>{this.getValidateLabel()}</a>
            <a className={this.getSolveClasses()} onClick={onSolve}>{this.getSolveLabel()}</a>
            <a className='pure-button clear-button' onClick={onClear}>clear</a>
          </div>
        </div>
      </div>
    )
  }
}
