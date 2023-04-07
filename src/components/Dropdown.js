import React from 'react'
export const CustomDropdown = (props) => (
  <div className="form-group">
    <strong>{props.username}</strong>
    <select
      className="form-control"
      name="{props.username}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item.username}
        </option>
      ))}
    </select>
  </div>
)
export default class CustomListDropDown extends React.Component {
  constructor() {
    super()
    this.state = {
      collection: [],
      value: '',
    }
  }
  componentDidMount() {
    fetch('https://restcountries.com/v2/all')
      .then((response) => response.json())
      .then((res) => this.setState({ collection: res }))
  }
  onChange = (event) => {
    this.setState({ value: event.target.name})
  }
  render() {
    return (
      <div className="container mt-4">
        <h2>React Dropdown List with Bootstrap Example</h2>
        <CustomDropdown
          name={this.state.name}
          options={this.state.collection}
          onChange={this.onChange}
        />
      </div>
    )
  }
}