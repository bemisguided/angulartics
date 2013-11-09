describe('Module: angulartics', function() {
  beforeEach(module('angulartics'));

  it('should be configurable', function() {
    module(function(_$analyticsProvider_) {
      _$analyticsProvider_.virtualPageviews(false);
    });
    inject(function(_$analytics_) {
      expect(_$analytics_.settings.pageTracking.autoTrackVirtualPages).toBe(false);
    });
  });

  describe('Provider: analytics', function() {
    var analytics,
      rootScope,
      location;
    beforeEach(inject(function(_$analytics_, _$rootScope_, _$location_) {
      analytics = _$analytics_;
      location = _$location_;
      rootScope = _$rootScope_;

      spyOn(analytics, 'pageTrack');

      location.path('/');
    }));

    describe('initialize', function() {
      it('should tracking pages by default', function() {
        expect(analytics.settings.pageTracking.autoTrackVirtualPages).toBe(true);
      });
    });

    it('should support tracking pages on route change when using build in router', function() {
      location.path('/abc');
      rootScope.$emit('$routeChangeSuccess');
      expect(analytics.pageTrack).toHaveBeenCalledWith('/abc');
    });

    it('should support tracking pages on route change when using ui-router', function() {
      location.path('/def');
      rootScope.$emit('$stateChangeSuccess');
      expect(analytics.pageTrack).toHaveBeenCalledWith('/def');
    });
    
  });
});