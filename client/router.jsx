FlowRouter.route('/', {
  action() {
    ReactLayout.render(AppBody, {
      content: <Home/>
    });
  }
});

FlowRouter.route('/author/:author', {
  action() {
    ReactLayout.render(AppBody, {
      content: <Author/>
    });
  }
});

FlowRouter.route('/planet/:planet', {
  action() {
    ReactLayout.render(AppBody, {
      content: <Planet/>
    });
  }
});
