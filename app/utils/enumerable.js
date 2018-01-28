export default function enumerable(options) {
  enumobj = {};
  for (let x = 0; x < options.length; x++) {
    enumobj[options] = x;
  }

  return enumobj.freeze();
}
