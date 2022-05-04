import { COMPONENT_SIZE_BY_FORMAT } from "../../../constants/image-file-directory.constant";
import { readDataViewAsString } from "../../../utils";

enum TagFormat {
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

enum Signedness {
  Signed,
  Unsigend,
}

enum IntegerType {
  Byte = 1,
  Short = 2,
  Long = 4,
}

enum ActualNumberType {
  Float = 4,
  Double = 8,
}

export type IFDPayload = string | number | number[];

export interface IIFDEntry {
  id: number;
  formatString: string;
  payload: IFDPayload;
  isExifOffset: boolean;
  isGPSInfo: boolean;
}

export class IFDEntry implements IIFDEntry {
  private _id: number;
  private _format: number;
  private _componentCount: number;
  private _rawPayload: number; // NOTE: 데이터 크기가 4 Bytes 이상인 경우, 데이터가 위치한 Offset이 기록되어 있습니다.
  private _resolvedPayload: IFDPayload;

  get id(): number {
    return this._id;
  }

  get formatString(): string {
    return TagFormat[this._format];
  }

  get payload(): IFDPayload {
    return this._resolvedPayload;
  }

  get isExifOffset(): boolean {
    return this._id === 0x8769;
  }

  get isGPSInfo(): boolean {
    return this._id === 0x8825;
  }

  constructor(dataView: DataView, offset: number, isLittle: boolean) {
    this._id = dataView.getUint16(offset, isLittle);
    this._format = dataView.getUint16(offset + 2, isLittle);
    this._componentCount = dataView.getUint32(offset + 4, isLittle);
    this._rawPayload = dataView.getUint32(offset + 8, isLittle);

    const componentSize = COMPONENT_SIZE_BY_FORMAT[this._format];
    const payloadSize = componentSize * this._componentCount;
    const dataOffset = payloadSize > 4 ? this._rawPayload + 10 : offset + 8; // NOTE: 데이터의 Offset 값은 Byte Align Tag의 Offset 값(= 10)을 기준으로 합니다.
    this._resolvedPayload = this.resolvePayload(dataView, dataOffset, isLittle);
  }

  private resolvePayload(dataView: DataView, dataOffset: number, isLittle: boolean): IFDPayload {
    const resolveUnsingedInteger = (type: IntegerType): number | number[] => {
      const result: number[] = [];

      for (let n = 0; n < this._componentCount; n++) {
        const offset = dataOffset + type * n;

        switch (type) {
          case IntegerType.Byte:
            result.push(dataView.getUint8(offset));
            break;
          case IntegerType.Short:
            result.push(dataView.getUint16(offset, isLittle));
            break;
          case IntegerType.Long:
            result.push(dataView.getUint32(offset, isLittle));
            break;
        }
      }

      if (result.length === 1) {
        return result.pop()!;
      }
      return result;
    };
    const resolveSingedInteger = (type: IntegerType): number | number[] => {
      const result: number[] = [];

      for (let n = 0; n < this._componentCount; n++) {
        const offset = dataOffset + type * n;

        switch (type) {
          case 1:
            result.push(dataView.getInt8(offset));
            break;
          case 2:
            result.push(dataView.getInt16(offset, isLittle));
            break;
          case 4:
            result.push(dataView.getInt32(offset, isLittle));
            break;
        }
      }

      if (result.length === 1) {
        return result.pop()!;
      }
      return result;
    };
    const resolveRational = (signedness: Signedness): number | number[] => {
      const result: number[] = [];

      for (let n = 0; n < this._componentCount; n++) {
        const offset = dataOffset + 8 * n;
        let numerator: number, denominator: number;

        switch (signedness) {
          case Signedness.Unsigend:
            numerator = dataView.getUint32(offset, isLittle);
            denominator = dataView.getUint32(offset + 4, isLittle);
            break;
          case Signedness.Signed:
            numerator = dataView.getInt32(offset, isLittle);
            denominator = dataView.getInt32(offset + 4, isLittle);
            break;
        }

        result.push(numerator / denominator);
      }

      if (result.length === 1) {
        return result.pop()!;
      }
      return result;
    };
    const resolveFloat = (type: ActualNumberType): number | number[] => {
      const result: number[] = [];

      for (let n = 0; n < this._componentCount; n++) {
        const offset = dataOffset + type * n;

        switch (type) {
          case ActualNumberType.Float:
            result.push(dataView.getFloat32(offset, isLittle));
            break;
          case ActualNumberType.Double:
            result.push(dataView.getFloat64(offset, isLittle));
            break;
        }
      }

      if (result.length === 1) {
        return result.pop()!;
      }
      return result;
    };
    const resolveStringData = (): string => {
      const result = readDataViewAsString(dataView, dataOffset, this._componentCount);
      const firstNullIndex = result.indexOf("\0");

      return firstNullIndex !== -1 ? result.substring(0, firstNullIndex) : result;
    };

    switch (this._format) {
      case TagFormat.UnsignedByte:
        return resolveUnsingedInteger(IntegerType.Byte);
      case TagFormat.ASCIIString:
        return resolveStringData();
      case TagFormat.UnsignedShort:
        return resolveUnsingedInteger(IntegerType.Short);
      case TagFormat.UnsignedLong:
        return resolveUnsingedInteger(IntegerType.Long);
      case TagFormat.UnsignedRational:
        return resolveRational(Signedness.Unsigend);
      case TagFormat.SignedByte:
        return resolveSingedInteger(IntegerType.Byte);
      case TagFormat.Undefined:
        return this._rawPayload;
      case TagFormat.SignedShort:
        return resolveSingedInteger(IntegerType.Short);
      case TagFormat.SignedLong:
        return resolveSingedInteger(IntegerType.Long);
      case TagFormat.SignedRational:
        return resolveRational(Signedness.Signed);
      case TagFormat.SingleFloat:
        return resolveFloat(ActualNumberType.Float);
      case TagFormat.DoubleFloat:
        return resolveFloat(ActualNumberType.Double);
      default:
        throw new Error("Invalid IFDEntry Format");
    }
  }
}
