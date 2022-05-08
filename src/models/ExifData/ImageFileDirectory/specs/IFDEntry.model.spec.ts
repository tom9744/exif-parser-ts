import { IFDEntry } from "../IFDEntry.model";

describe("IFDEntry 클래스의 인스턴스를 생성한다.", () => {
  it("클래스 인스턴스가 정상적으로 생성된다.", () => {
    const dataView = MockGenerator.asciiString();
    const instance = new IFDEntry(dataView, 0, false);

    expect(instance).toBeDefined();
  });

  it("오프셋이 DataView 크기를 초과하는 경우, RangeError 예외를 던진다.", () => {
    expect(() => {
      const dataView = MockGenerator.asciiString();

      new IFDEntry(dataView, 60, false);
    }).toThrowError(RangeError);
  });
});

describe("IFD Entry w/ ASCII String Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.asciiString();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const data = entry.payload;

    expect(data).toBe("Apple");
  });
});

describe("IFD Entry w/ Unsigned Short Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.unsignedShort();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const data = entry.payload;

    expect(data).toEqual(0x0006);
  });
});

describe("IFD Entry w/ Unsigned Long Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.unsignedLong();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const data = entry.payload;

    expect(data).toEqual(0x00e0);
  });
});

describe("IFD Entry w/ Unsigned Rational Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.unsignedRational();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const data = entry.payload;

    expect(data).toEqual([
      299 / 1000, // 0.299
      587 / 1000, // 0.587
      114 / 1000, // 0.114
    ]);
  });
});

describe("IFD Entry w/ Signed Short Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.signedShort();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const data = entry.payload;

    expect(data).toEqual(-12);
  });
});

describe("IFD Entry w/ Signed Long Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.signedLong();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const data = entry.payload;

    expect(data).toEqual(-321);
  });
});

describe("IFD Entry w/ Signed Rational Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.signedRational();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const data = entry.payload;

    expect(data).toEqual([
      -299 / 1000, // 0.299
      -9322 / 1000, // 0.587
      -12 / 1000, // 0.114
    ]);
  });
});

describe("IFD Entry w/ Single Float Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.singleFloat();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const rawData = entry.payload as number[];
    const processedData = rawData.map((data) => data.toFixed(2));

    expect(processedData).toEqual([(91.12).toFixed(2), (87.18).toFixed(2), (10.11).toFixed(2), (12.97).toFixed(2)]);
  });
});

describe("IFD Entry w/ Double Float Data.", () => {
  let entry: IFDEntry;

  beforeEach(() => {
    const dataView = MockGenerator.doubleFloat();
    entry = new IFDEntry(dataView, 0, false);
  });

  it("should successfully read its actual data.", () => {
    const rawData = entry.payload as number[];
    const processedData = rawData.map((data) => data.toFixed(4));

    expect(processedData).toEqual([(91.1232).toFixed(4), (87.1817).toFixed(4), (10.1127).toFixed(4)]);
  });
});

class MockGenerator {
  private static readonly _byteAlignOffset = 10;
  private static readonly _emptyArrayBuffer = new ArrayBuffer(50);

  static asciiString(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x010f); // Tag (= Make)
    dataView.setUint16(2, 0x0002); // Format (= ASCII String)
    dataView.setUint32(4, 0x0006); // Component Count
    dataView.setUint32(8, 0x0020); // Payload (= Data's Offset)

    dataView.setUint8(this._byteAlignOffset + 32, 0x0041); // A
    dataView.setUint8(this._byteAlignOffset + 33, 0x0070); // p
    dataView.setUint8(this._byteAlignOffset + 34, 0x0070); // p
    dataView.setUint8(this._byteAlignOffset + 35, 0x006c); // l
    dataView.setUint8(this._byteAlignOffset + 36, 0x0065); // e
    dataView.setUint8(this._byteAlignOffset + 37, 0x0000); // \0

    return dataView;
  }

  static unsignedShort(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x0112); // Tag (= Orientation)
    dataView.setUint16(2, 0x0003); // Format (= Unsinged Short)
    dataView.setUint32(4, 0x0001); // Component Count
    dataView.setUint16(8, 0x0006); // Payload (= Data)

    return dataView; // 01 12 00 03 00 00 00 01 00 06 00 00 (12 Bytes)
  }

  static unsignedLong(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x8769); // Tag (= ExifOffset)
    dataView.setUint16(2, 0x0004); // Format (= Unsinged Long)
    dataView.setUint32(4, 0x0001); // Component Count
    dataView.setUint32(8, 0x00e0); // Payload (= Data)

    return dataView; // 87 69 00 04 00 00 00 01 00 00 00 03 (12 Bytes)
  }

  static unsignedRational(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x0211); // Tag (= YCbCrCoefficients)
    dataView.setUint16(2, 0x0005); // Format (= Unsigned Rational)
    dataView.setUint32(4, 0x0003); // Component Count
    dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    dataView.setUint32(this._byteAlignOffset + 16, 0x012b); // 299
    dataView.setUint32(this._byteAlignOffset + 20, 0x03e8); // 1000

    dataView.setUint32(this._byteAlignOffset + 24, 0x024b); // 587
    dataView.setUint32(this._byteAlignOffset + 28, 0x03e8); // 1000

    dataView.setUint32(this._byteAlignOffset + 32, 0x0072); // 114
    dataView.setUint32(this._byteAlignOffset + 36, 0x03e8); // 1000

    return dataView;
  }

  static signedShort(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x0092); // Tag (= Random Number)
    dataView.setUint16(2, 0x0008); // Format (= Singed Short)
    dataView.setUint32(4, 0x0001); // Component Count
    dataView.setInt16(8, 0xfff4); // Payload (= Data)

    return dataView; // 00 92 00 08 00 00 00 01 ff f4 00 00 (12 Bytes)
  }

  static signedLong(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x1769); // Tag (= Random Number)
    dataView.setUint16(2, 0x0009); // Format (= Unsinged Long)
    dataView.setUint32(4, 0x00000001); // Component Count
    dataView.setUint32(8, 0xfffffebf); // Payload (= Data)

    return dataView; // 17 69 00 09 00 00 00 01 ff ff fe bf (12 Bytes)
  }

  static signedRational(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x1211); // Tag (= Random Number)
    dataView.setUint16(2, 0x000a); // Format (= Unsigned Rational)
    dataView.setUint32(4, 0x0003); // Component Count
    dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    dataView.setInt32(this._byteAlignOffset + 16, 0xfffffed5); // -299
    dataView.setInt32(this._byteAlignOffset + 20, 0x000003e8); // 1000

    dataView.setInt32(this._byteAlignOffset + 24, 0xffffdb96); // -9322
    dataView.setInt32(this._byteAlignOffset + 28, 0x000003e8); // 1000

    dataView.setInt32(this._byteAlignOffset + 32, 0xfffffff4); // -12
    dataView.setInt32(this._byteAlignOffset + 36, 0x000003e8); // 1000

    return dataView;
  }

  static singleFloat(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x9721); // Tag (= Random Number)
    dataView.setUint16(2, 0x000b); // Format (= Unsigned Rational)
    dataView.setUint32(4, 0x0004); // Component Count
    dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    dataView.setFloat32(this._byteAlignOffset + 16, 91.12);
    dataView.setFloat32(this._byteAlignOffset + 20, 87.18);
    dataView.setFloat32(this._byteAlignOffset + 24, 10.11);
    dataView.setFloat32(this._byteAlignOffset + 28, 12.97);

    return dataView;
  }

  static doubleFloat(): DataView {
    const dataView = new DataView(this._emptyArrayBuffer.slice(0));

    dataView.setUint16(0, 0x8631); // Tag (= Random Number)
    dataView.setUint16(2, 0x000c); // Format (= Unsigned Rational)
    dataView.setUint32(4, 0x0003); // Component Count
    dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    dataView.setFloat64(this._byteAlignOffset + 16, 91.1232);
    dataView.setFloat64(this._byteAlignOffset + 24, 87.1817);
    dataView.setFloat64(this._byteAlignOffset + 32, 10.1127);

    return dataView;
  }
}
