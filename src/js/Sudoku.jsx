import React from 'react'
import classNames from 'classnames'

const ROWS = 'ABCDEFGHI'.split('')
const COLUMNS = '123456789'.split('')

export class Sudoku extends React.Component {
  constructor(props) {
    super(props)
    this.state = { values: props.values }
  }

  componentWillReceiveProps(nextProps) {
    this.state = { values: nextProps.values }
  }

  render() {
    return (
      <table className='sudoku pure-table pure-table-bordered'>
        <tbody>
          { ROWS.map(this.renderRow, this) }
        </tbody>
      </table>
    )
  }

  renderRow(row) {
    return (
      <tr key={row} >
        { COLUMNS.map((col) => this.renderColumn(row, col)) }
      </tr>
    )
  }

  renderColumn(row, col) {
    let onKeyDown = (e) => {
      e.preventDefault()
      this.state.values.set(row + col, String.fromCharCode(e.keyCode) || null)
      this.setState({values: this.state.values})
      this.props.onChange(this.state.values)
    }

    let conflicting = Array.from(this.props.conflicts.values()).reduce((acc, value) => acc.concat(value), [])

    let classes = classNames({
      'invalid': conflicting.includes(row+col)
    })

    return (
      <td key={col} className={classes}>
        <input
          type='text'
          name={row + col}
          value={this.state.values.get(row+col)}
          onKeyDown={onKeyDown} />
      </td>
    )
  }
}

Sudoku.propTypes = {
  values: React.PropTypes.object,
  conflicts: React.PropTypes.object,
  onChange: React.PropTypes.function
}

Sudoku.defaultProps = {
  values: new Map(),
  conflicts: new Map()
}

export default Sudoku
