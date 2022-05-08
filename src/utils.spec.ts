import { readDataViewAsString, readUint32AsString } from "./utils";

const transformStringToDataView = (string: string): DataView => {
  const hexCodes: number[] = [];

  for (let index = 0; index < string.length; index++) {
    const hexCode = string.charCodeAt(index);

    hexCodes.push(hexCode);
  }

  const arrayBuffer = new ArrayBuffer(hexCodes.length);
  const dataView = new DataView(arrayBuffer);

  hexCodes.forEach((hexCode, index) => {
    dataView.setInt8(index, hexCode);
  });

  return dataView;
};

describe("문자열 'Hello, World!'를 readUint32AsString를 이용해 읽는다.", () => {
  const stub = transformStringToDataView("Hello, World!");

  const validParameters = [
    { offset: 0, expected: "Hell" },
    { offset: 2, expected: "llo," },
    { offset: 5, expected: ", Wo" },
  ];

  validParameters.forEach(({ offset, expected }) => {
    it(`지정된 오프셋 ${offset}부터 4개의 바이트를 문자열로 읽는다.`, () => {
      const result = readUint32AsString(stub, offset);

      expect(result).toBe(expected);
    });
  });

  it(`지정된 오프셋이 DataView 크기를 초과하면, 범위를 벗어났다는 내용의 예외를 던진다.`, () => {
    expect(() => {
      readUint32AsString(stub, 20);
    }).toThrowError("Offset is outside the bounds of the DataView");
  });
});

describe("문자열 'Hello, World!'를 readDataViewAsString 이용해 읽는다.", () => {
  const stub = transformStringToDataView("Hello, World!");

  const validParameters = [
    { offset: 0, length: 8, expected: "Hello, W" },
    { offset: 2, length: 8, expected: "llo, Wor" },
    { offset: 5, length: 8, expected: ", World!" },
  ];

  validParameters.forEach(({ offset, length, expected }) => {
    it(`지정된 오프셋 ${offset}부터 ${length}개의 바이트를 문자열로 읽는다.`, () => {
      const result = readDataViewAsString(stub, offset, length);

      expect(result).toBe(expected);
    });
  });

  it(`지정된 오프셋이 DataView 크기를 초과하면, 범위를 벗어났다는 내용의 예외를 던진다.`, () => {
    expect(() => {
      readDataViewAsString(stub, 20, 8);
    }).toThrowError("Offset is outside the bounds of the DataView");
  });

  it(`지정된 길이가 DataView 크기를 초과하면, 범위를 벗어났다는 내용의 예외를 던진다.`, () => {
    expect(() => {
      readDataViewAsString(stub, 0, 20);
    }).toThrowError("Offset is outside the bounds of the DataView");
  });
});
