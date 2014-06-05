'use strict';

describe('Service: Instagram', function () {

  // load the service's module
  beforeEach(module('photoVotoApp'));

  // instantiate service
  var Instagram;
  beforeEach(inject(function (_Instagram_) {
    Instagram = _Instagram_;
  }));

  it('should do something', function () {
    expect(!!Instagram).toBe(true);
  });

});
