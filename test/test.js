test('expect', function(){
  equals(typeof expect, 'function');
});
test('toEqual', function(){
  expect(1  ).toEqual(1);
  expect(1  ).toEqual('1');
  expect('1').toEqual(1);
  expect('1').toEqual('1');
});
test('toNotEqual', function(){
  expect(2  ).toNotEqual(1);
  expect(2  ).toNotEqual('1');
  expect('2').toNotEqual(1);
  expect('2').toNotEqual('1');
});
test('toBe', function(){
  expect(1).toBe(1);
  expect(window).toBe(window);
});
test('toNotBe', function(){

});
test('toBeA', function(){
  expect(1  ).toBeA('number');
  expect(1.2).toBeA('number');
  expect(function(){}).toBeA(Function);
  expect(new Number).toBeA(Number);
});
test('toNotBeA', function(){
  
});
test('toBeAnInstanceOf', function(){
  
});
test('toNotBeAnInstanceOf', function(){
  
});
test('toDeepEqual', function(){
  
});
test('toNotDeepEqual', function(){
  
});
test('toThrow', function(){
  
});
test('toNotThrow', function(){
  
});
test('toThrowA', function(){
  
});
test('toNotThrowA', function(){
  
});
test('toHaveProperty', function(){
  
});
test('toNotHaveProperty', function(){
  
});