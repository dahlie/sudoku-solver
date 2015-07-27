import React from 'react'

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
      this.state.values.set(row + col, parseInt(String.fromCharCode(e.keyCode)) || null)
      this.setState({values: this.state.values})
      this.props.onChange(this.state.values)
    }

    return (
      <td key={col}>
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
  onChange: React.PropTypes.function
}

Sudoku.defaultProps = {
  values: {}
}

export default Sudoku
