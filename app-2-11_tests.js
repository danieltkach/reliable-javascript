describe('DiContainer', function() {
  var container;
  
  beforeEach(function(){
    container = new DiContainer();
  });
  
  describe('register(name, dependencies, func)', function() {
    
    it('throws if any argument is missing or the wrong type', function() {
      var badArgs = [
        // No args at all
        [],
        // Just the name
        ['Name'],
        // Just name and dependencies
        ['Name', ['Dependency1', 'Dependency2']],
        // Missing the dependencies.
        // (Commercial frameworks support this, but DiContainer does not.)
        ['Name', function() {}],
        // Various examples of wrong types
        [1, ['a', 'b'], function() {}],
        ['Name', [1,2], function() {}],
        ['Name', ['a', 'b'], 'should be a function']
      ];
      
      badArgs.forEach(function(args) {
        expect(function() {
          container.register.apply(container,args);
        }).toThrowError(container.messages.registerRequiresArgs)
      });
    });
  });
  
  describe('get(name)', function() {
    it('returns undefined if name was not registered', function() {
      expect(container.get('notDefined')).toBeUndefined();
    });
    
    it('returns the result of executing the registered function', function() {
      var name = 'MyName',
          returnFromRegisteredFunction = "something";
          
      container.register(name, [], function() {
        return returnFromRegisteredFunction;
      });
      
      expect(container.get(name)).toBe(returnFromRegisteredFunction);
    });
  });
});