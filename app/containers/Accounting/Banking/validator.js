export function alphaNumeric(value) {
  console.log(` from validation ${(value.match('^[a-zA-Z0-9]+$')+'') === value} value ${value}`)
  return (value.match('^[a-zA-Z0-9]+$')+'') === value;
}
