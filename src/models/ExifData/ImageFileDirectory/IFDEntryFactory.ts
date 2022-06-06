import { readDataViewAsString } from "../../../utils";

export enum TagFormat {
  UnsignedByte = 0x01,
  ASCIIString = 0x02,
  UnsignedShort = 0x03,
  UnsignedLong = 0x04,
  UnsignedRational = 0x05,
  SignedByte = 0x06,
  Undefined = 0x07,
  SignedShort = 0x08,
  SignedLong = 0x09,
  SignedRational = 0x0a,
  SingleFloat = 0x0b,
  DoubleFloat = 0x0c,
}

export const COMPONENT_SIZE_BY_FORMAT: Record<TagFormat, number> = {
  0x01: 1, // Unsigned Byte
  0x02: 1, // ASCII String
  0x03: 2, // Unsigned Short
  0x04: 4, // Unsigned Long
  0x05: 8, // Unsigned Rational
  0x06: 1, // Signed Byte
  0x07: 1, // Undefined
  0x08: 2, // Signed Short
  0x09: 4, // Signed Long
  0x0a: 8, // Signed Rational
  0x0b: 4, // Single Float
  0x0c: 8, // Double Float
};

type FactoryArgs = {
  dataView: DataView;
  entryOffset: number;
};

type RawEntry = {
  tag: number;
  format: TagFormat;
  numberOfComponents: number;
  payload: number; // NOET: 실제 데이터 또는 데이터의 위치를 나타내는 오프셋 값
};

export type EntryData = string | number | number[];

export interface IIFDEntryModel {
  readonly tag: number;
  readonly data: EntryData;
  get isExifTag(): boolean;
  get isGpsTag(): boolean;
}

class IFDEntryModel implements IIFDEntryModel {
  get isExifTag(): boolean {
    return this.tag === 0x8769;
  }
  get isGpsTag(): boolean {
    return this.tag === 0x8825;
  }

  constructor(public readonly tag: number, public readonly data: EntryData) {}
}

export class IFDEntryFactory {
  constructor(private readonly littleEndian: boolean) {}

  private readEntry(dataView: DataView, entryOffset: number): RawEntry {
    const tag = dataView.getUint16(entryOffset, this.littleEndian);
    const format = dataView.getUint16(entryOffset + 2, this.littleEndian);
    const numberOfComponents = dataView.getUint32(entryOffset + 4, this.littleEndian);
    const payload = dataView.getUint32(entryOffset + 8, this.littleEndian);

    const isTagFormat = (format: number): format is TagFormat => 0x00 < format && format < 0x0d;

    if (!isTagFormat(format)) {
      throw new TypeError("IFD Entry 인스턴스를 생성할 수 없습니다. 유효하지 않은 포맷 값이 감지 되었습니다.");
    }

    return { tag, format, numberOfComponents, payload };
  }

  private readStringData(dataView: DataView, dataOffset: number, numberOfComponents: number): string {
    const result = readDataViewAsString(dataView, dataOffset, numberOfComponents);
    const firstNullStringIndex = result.indexOf("\0");

    return firstNullStringIndex === -1 ? result : result.substring(0, firstNullStringIndex);
  }

  private readIntData(dataView: DataView, dataOffset: number, numberOfComponents: number, componentSize: 1 | 2 | 4): number | number[] {
    const result = Array(numberOfComponents)
      .fill("")
      .map((_, index) => {
        const offset = dataOffset + componentSize * index;

        switch (componentSize) {
          case 1:
            return dataView.getInt8(offset);
          case 2:
            return dataView.getInt16(offset, this.littleEndian);
          case 4:
            return dataView.getInt32(offset, this.littleEndian);
        }
      });

    return result.length === 1 ? result[0] : result;
  }

  private readUintData(dataView: DataView, dataOffset: number, numberOfComponents: number, componentSize: 1 | 2 | 4): number | number[] {
    const result = Array(numberOfComponents)
      .fill("")
      .map((_, index) => {
        const offset = dataOffset + componentSize * index;

        switch (componentSize) {
          case 1:
            return dataView.getUint8(offset);
          case 2:
            return dataView.getUint16(offset, this.littleEndian);
          case 4:
            return dataView.getUint32(offset, this.littleEndian);
        }
      });

    return result.length === 1 ? result[0] : result;
  }

  private readRationalData(dataView: DataView, dataOffset: number, numberOfComponents: number, signed: boolean): number | number[] {
    const result = Array(numberOfComponents)
      .fill("")
      .map((_, index) => {
        const rationalComponentSize = 8;
        const numeratorOffset = dataOffset + rationalComponentSize * index;
        const denominatorOffset = numeratorOffset + 4;

        const numerator = signed ? dataView.getInt32(numeratorOffset, this.littleEndian) : dataView.getUint32(numeratorOffset, this.littleEndian);
        const denominator = signed ? dataView.getInt32(denominatorOffset, this.littleEndian) : dataView.getUint32(denominatorOffset, this.littleEndian);

        return numerator / denominator;
      });

    return result.length === 1 ? result[0] : result;
  }

  private readFloatData(dataView: DataView, dataOffset: number, numberOfComponents: number, componentSize: 4 | 8): number | number[] {
    const result = Array(numberOfComponents)
      .fill("")
      .map((_, index) => {
        const offset = dataOffset + componentSize * index;

        switch (componentSize) {
          case 4:
            return dataView.getFloat32(offset, this.littleEndian);
          case 8:
            return dataView.getFloat64(offset, this.littleEndian);
        }
      });

    return result.length === 1 ? result[0] : result;
  }

  createEntry({ dataView, entryOffset }: FactoryArgs): IIFDEntryModel {
    const { tag, format, numberOfComponents, payload } = this.readEntry(dataView, entryOffset);

    const componentSize = COMPONENT_SIZE_BY_FORMAT[format];
    const payloadSize = componentSize * numberOfComponents;

    const dataOffset = payloadSize > 4 ? payload + 10 : entryOffset + 8;

    let data: EntryData = [];

    switch (format) {
      case TagFormat.UnsignedByte:
        data = this.readUintData(dataView, dataOffset, numberOfComponents, 1);
        break;
      case TagFormat.ASCIIString:
        data = this.readStringData(dataView, dataOffset, numberOfComponents);
        break;
      case TagFormat.UnsignedShort:
        data = this.readUintData(dataView, dataOffset, numberOfComponents, 2);
        break;
      case TagFormat.UnsignedLong:
        data = this.readUintData(dataView, dataOffset, numberOfComponents, 4);
        break;
      case TagFormat.UnsignedRational:
        data = this.readRationalData(dataView, dataOffset, numberOfComponents, false);
        break;
      case TagFormat.SignedByte:
        data = this.readUintData(dataView, dataOffset, numberOfComponents, 1);
        break;
      case TagFormat.Undefined:
        data = payload.toString();
        break;
      case TagFormat.SignedShort:
        data = this.readIntData(dataView, dataOffset, numberOfComponents, 2);
        break;
      case TagFormat.SignedLong:
        data = this.readIntData(dataView, dataOffset, numberOfComponents, 4);
        break;
      case TagFormat.SignedRational:
        data = this.readRationalData(dataView, dataOffset, numberOfComponents, true);
        break;
      case TagFormat.SingleFloat:
        data = this.readFloatData(dataView, dataOffset, numberOfComponents, 4);
        break;
      case TagFormat.DoubleFloat:
        data = this.readFloatData(dataView, dataOffset, numberOfComponents, 8);
        break;
    }

    return new IFDEntryModel(tag, data);
  }
}
