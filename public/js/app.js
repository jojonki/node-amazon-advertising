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
    tagName: 'li',
    initialize: function() {
      this.model.on('destroy', this.destroy, this);
    },
    template: _.template($('#product-template').html()),
    destroy: function() {
      // if(confirm('are you sure')) {
      // this.model.destroy();
      this.$el.remove();
      // }
    },
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  var ProductsView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function() {
      this.collection.on('add', this.addNew, this);
      this.collection.on('change', this.updateCount, this);
      this.collection.on('destroy', this.destroy, this);
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

  var SearchView = Backbone.View.extend({
    el: '#search-form',
    events: {
      'submit': 'submit'
    },
    submit: function(e) {
      e.preventDefault();
      var key = $('#search-key').val();
      console.log(key);
      $.get('search/' + key, 
        function(data) {
          console.log('response', data);
        }
      );
    }
  });

  var products = new Products([
  ]);

  var searchView = new SearchView({collection: products});
  var productsView = new ProductsView({collection: products});
  $('#search-result').html(productsView.render().el);

  var socket = io.connect();
  socket.on('SearchResults', function(data) {
    console.log(data.items);
    data.items.forEach(function(item) {
      if(_.has(item, 'OfferSummary')) { // except kindle price
        var product = new Product();
        var decoratedData = Util.decorateData(item);
        console.log(item);
        console.log(decoratedData);
        // if(product.set({title: item.ItemAttributes[0].Title[0], url: item.DetailPageURL[0]}, {validate: true})) {
        if(product.set(decoratedData, {validate: true})) {
          products.add(product);
        }
      }
    });
  });
 });
