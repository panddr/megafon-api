import React, { PropTypes, Component } from "react";

if (process.env.BROWSER) {
  require("../../style/Switcher.scss");
}

class Switcher extends Component {

  static propTypes = {
    options:  PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value:    PropTypes.string
  }


  // Handlers
  //
  handleChange(value) {
    this.props.onChange(value);
  }


  // Renderers
  //
  renderOptions() {
    return this.props.options.map((option, index) => {
      return (
        <label key = { index } >
          <input
            type     = "radio"
            value    = { option.value }
            onChange = { this.handleChange.bind(this, option.value) }
            checked  = { this.props.value === option.value } />
          { option.labelText }
        </label>
      );
    });
  }

  render() {
    return (
      <div className="grabr-switcher">
        { this.renderOptions() }
      </div>
    );
  }
}

export default Switcher;
