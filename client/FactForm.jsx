FactForm = React.createClass({
  getInitialState() {
    return {showForm: false, text: ''}
  },
  submitDisabled() {
    let factChars = this.state.text.length;
    return (factChars > 0 && factChars <= 160 ? false : true);
  },
  charCount() {
    return parseInt(160 - this.state.text.length);
  },
  showFactForm() {
    this.setState({showForm: true});
  },
  hideFactForm() {
    this.setState({showForm: false});
  },
  handleChange(event) {
    this.setState({text: event.target.value});
  },
  handleSubmit(event) {
    event.preventDefault();

    var planet = ReactDOM.findDOMNode(this.refs.planet).value;
    var fact = ReactDOM.findDOMNode(this.refs.fact).value.trim();

    Meteor.call('addFact', planet, fact);

    this.setState({text: ''})
    this.setState({showForm: false});
  },
  render() {
    let form;

    if (this.state.showForm)
      form = (
        <div>
          <div className="hide-form" onClick={this.hideFactForm}>
            <button>- Cancel</button>
          </div>

          <form className="new-fact" onSubmit={this.handleSubmit}>
            <select ref="planet">
              <option value="Mercury">Mercury</option>
              <option value="Venus">Venus</option>
              <option value="Earth">Earth</option>
              <option value="Mars">Mars</option>
              <option value="Jupiter">Jupiter</option>
              <option value="Saturn">Saturn</option>
              <option value="Uranus">Uranus</option>
              <option value="Neptune">Neptune</option>
            </select>
            <textarea ref="fact" maxLength="160" placeholder="Write your fact here..." onChange={this.handleChange}></textarea>
            <div>
              <span>{this.charCount()}</span>
              <input type="submit" value="Submit" disabled={this.submitDisabled()}/>
            </div>
          </form>
        </div>
      )
    else
      form = (
        <div className="show-form" onClick={this.showFactForm}>
          <button>+ Add New Fact</button>
        </div>
      )

    return (
      <li>{form}</li>
    )
  }
});
