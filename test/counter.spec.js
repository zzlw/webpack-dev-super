var assert = require("assert");
describe('Array', function(){
	describe('#indexOf()', function(){
  		it('测试用例1', function(){
        assert.equal(-1, [1,2,3].indexOf(5));
		    assert.equal(-1, [1,2,3].indexOf(0));
		})
	});

	describe('#indexOf()', function(){
  		it('测试用例2', function(){
		    assert.equal(-1, [1,2,3].indexOf(2));
		})
	})
});
