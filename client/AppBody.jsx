AppBody = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },
  render() {
    return (
      <div>
        <header>
          <nav>
            <ul>
              <li><AccountsUIWrapper /></li>
              { this.data.currentUser ?
                <li>
                  <a href={'/author/' + this.data.currentUser.username}>My Facts</a>
                </li> :
                ''
              }
              <li><a href="/">Home</a></li>
            </ul>
          </nav>
        </header>

        <section>
          {this.props.content}
        </section>
      </div>
    );
  }
});
