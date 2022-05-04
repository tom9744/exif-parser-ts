export function readUint32AsString(dataView: DataView, offset: number) {
  const charArray = [];

  for (let n = offset; n < offset + 4; n++) {
    charArray.push(String.fromCharCode(dataView.getInt8(n)));
  }

  return charArray.join("");
}

export function readDataViewAsString(dataView: DataView, offset: number, length: number) {
  const charArray = [];

  for (let n = offset; n < offset + length; n++) {
    charArray.push(String.fromCharCode(dataView.getInt8(n)));
  }

  return charArray.join("");
}
