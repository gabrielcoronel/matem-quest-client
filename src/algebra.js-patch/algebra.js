import Fraction from './src/fractions'
import { Expression } from './src/expressions'
import Equation from './src/equations'
import Parser from './src/parser'


var parse = function(input){
  var parser = new Parser();
  var result = parser.parse(input);
  return result;
};

var toTex = function(input) {
  if (input instanceof Fraction || input instanceof Expression || input instanceof Equation) {
    return input.toTex();
  } else if (input instanceof Array) {
    return input.map(
      function(e) {
        if (e instanceof Fraction) {
          return e.toTex();
        } else {
          return e.toString();
        }
      }
    ).join();
  } else {
    return input.toString();
  }
};

export default {
  Fraction: Fraction,
  Expression: Expression,
  Equation: Equation,
  parse: parse,
  toTex: toTex
};
