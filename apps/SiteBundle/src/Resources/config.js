(function(self) {
  self.API = function() {
    const url = 'http://api.inkrest.fr';            // only value to change if need

    return {
      creation  : url +'/creation',
      format    : url +'/format',
      product   : {
        all       : url +'/products',
        last      : url +'/last_product',
        one       : url +'/product/',
      },
      user      : {
        all             : url +'/users/',
        connect         : url +'/users/connect',
        create          : url +'/users/create',
        disconnect      : url +'/users/disconnect',
        one             : url +'/users/',
        update          : url +'/users/update'
      }
    };
  };
})(typeof self !== 'undefined' ? self : this);
