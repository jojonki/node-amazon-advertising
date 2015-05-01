 $(function() {
  var Product = Backbone.Model.extend({
    defaults: {
      'title': 'hoge',
      'url': 'http://hoge.com',
      'price': ''
    }
  });

  var Products = Backbone.Collection.extend({
    model: Product
  });

  var ProductView = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
      this.model.on('destroy', this.remove, this);
      this.model.on('reset', this.reset, this);
    },
    template: _.template($('#product-template').html()),
    destroy: function() {
      console.log('model destroy');
      this.model.destroy();
    },
    remove: function() {
      console.log('model remove');
      this.$el.remove();
    },
    reset: function() {
      console.log('reset in ProductView');
      this.destroy();
      this.remove();
    },
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  var ProductsView = Backbone.View.extend({
    tagName: 'div',
    initialize: function() {
      this.collection.on('add', this.addNew, this);
      this.collection.on('change', this.updateCount, this);
      this.collection.on('destroy', this.destroy, this);
      this.collection.on('reset', this.reset, this);
    },
    reset: function(collection) {
      console.log('reset', collection);
      // collection.each(function(model) {
      //   model.destroy();
      //   console.log(model);
      // });

    },
    addNew: function(product) {
      this.updateCount();
      // if(this.collection.models.length > 13) {
      //   this.collection.models[0].destroy();
      // }
      var productView = new ProductView({model: product});
      this.$el.prepend(productView.render().el);
      // $('#title').val('').focus();
      // this.updateCount();
    },
    updateCount: function() {
      $('#search-result-count').html(this.collection.length);

    },
    destroy: function() {
      console.log('destroy in Productsview');
    },
    render: function() {
      this.collection.each(function(product) {
        var productView = new ProductView({model: product});
        this.$el.append(productView.render().el);
      }.bind(this));
      return this;
    }
  });

  function search(key) {
    console.log('search:', key);
    Loading.enable('cube-grid');
    $.get('search/' + key, function(data) {
      Loading.destroy();
    });
  };

  var SearchView = Backbone.View.extend({
    el: '#search-form',
    events: {
      'submit': 'submit'
    },
    submit: function(e) {
      e.preventDefault();
      var key = $('#search-key').val();
      search(key);
    }
  });

  var products = new Products([
  ]);

  var searchView = new SearchView({collection: products});
  var productsView = new ProductsView({collection: products});
  $('#search-result').html(productsView.render().el);

  var socket = io.connect();
  socket.on('SearchResults', function(data) {
    _.each(_.clone(products.models), function(model) {
        model.destroy();
    });
    // products.each(function(model) {
    //   if(model) {
    //     console.log('destryo model', model);
    //     model.destroy();
    //   } else { console.log('model undefined'); }
    // });
    data.items.forEach(function(item) {
      if(_.has(item, 'OfferSummary')) { // except kindle price
        var product = new Product();
        var decoratedData = Util.decorateData(item);
        // if(product.set({title: item.ItemAttributes[0].Title[0], url: item.DetailPageURL[0]}, {validate: true})) {
        if(product.set(decoratedData, {validate: true})) {
          products.add(product);
        }
      }
    });
  });

  search('unity');
 });
