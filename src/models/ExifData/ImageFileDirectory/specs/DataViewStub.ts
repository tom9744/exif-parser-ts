import { COMPONENT_SIZE_BY_FORMAT } from "../../../../constants/image-file-directory.constant";
import { TagFormat } from "../IFDEntry.model";

export class DataViewStub {
  private readonly BYTE_ALIGN_OFFSET = 10;
  private readonly BYTES_PER_ENTRY = 12;

  private _dataView: DataView;
  private _maxEntryCount: number;
  private _currentEntryCount: number;
  private _entryOffset: number;
  private _dataOffset: number;

  get dataView(): DataView {
    return this._dataView;
  }

  private get size(): number {
    return this._dataView.byteLength;
  }

  constructor(maxEntryCount: number, size: number) {
    if (maxEntryCount * this.BYTES_PER_ENTRY > size) {
      throw new RangeError("DataView의 크기가 지정된 개수의 엔트리를 생성하는데 필요한 최소 크기보다 작습니다.");
    }

    this._dataView = new DataView(new ArrayBuffer(this.BYTE_ALIGN_OFFSET + size));
    this._dataView.setInt16(this.BYTE_ALIGN_OFFSET, maxEntryCount); // NOTE: 최초 2바이트는 엔트리 개수를 저장한다.

    this._maxEntryCount = maxEntryCount;
    this._currentEntryCount = 0;

    this._entryOffset = this.BYTE_ALIGN_OFFSET + 2;
    this._dataOffset = this._entryOffset + maxEntryCount * this.BYTES_PER_ENTRY;
  }

  private setInt8ToEntry(value: number, signed: boolean = false): void {
    if (this._dataOffset + 1 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    if (signed) {
      this._dataView.setInt8(this._entryOffset, value);
    } else {
      this._dataView.setUint8(this._entryOffset, value);
    }
    this._entryOffset++;
  }

  private setInt16ToEntry(value: number, signed: boolean = false): void {
    if (this._dataOffset + 2 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    if (signed) {
      this._dataView.setInt16(this._entryOffset, value);
    } else {
      this._dataView.setUint16(this._entryOffset, value);
    }
    this._entryOffset += 2;
  }

  private setInt32ToEntry(value: number, signed: boolean = false): void {
    if (this._dataOffset + 4 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    if (signed) {
      this._dataView.setInt32(this._entryOffset, value);
    } else {
      this._dataView.setUint32(this._entryOffset, value);
    }
    this._entryOffset += 4;
  }

  private setInt8ToDataArea(value: number, signed: boolean = false): void {
    if (this._dataOffset + 1 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    if (signed) {
      this._dataView.setInt8(this._dataOffset, value);
    } else {
      this._dataView.setUint8(this._dataOffset, value);
    }
    this._dataOffset++;
  }

  private setInt16ToDataArea(value: number, signed: boolean = false): void {
    if (this._dataOffset + 2 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    if (signed) {
      this._dataView.setInt16(this._dataOffset, value);
    } else {
      this._dataView.setUint16(this._dataOffset, value);
    }
    this._dataOffset += 2;
  }

  private setInt32ToDataArea(value: number, signed: boolean = false): void {
    if (this._dataOffset + 4 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    if (signed) {
      this._dataView.setInt32(this._dataOffset, value);
    } else {
      this._dataView.setUint32(this._dataOffset, value);
    }
    this._dataOffset += 4;
  }

  appendStringEntry(tag: number, value: string): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = value.length;

    this.setInt16ToEntry(tag); // Tag
    this.setInt16ToEntry(TagFormat.ASCIIString); // Format
    this.setInt32ToEntry(componentCount); // Component's Count

    const componentSize = COMPONENT_SIZE_BY_FORMAT[TagFormat.ASCIIString]; // 1 Byte
    const payloadSize = componentSize * componentCount;

    const charCodes: number[] = [];

    for (let index = 0; index < value.length; index++) {
      const charCode = value.charCodeAt(index);

      charCodes.push(charCode);
    }

    if (payloadSize > 4) {
      this.setInt32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.
      charCodes.forEach((code) => this.setInt8ToDataArea(code));
    } else {
      [...charCodes, ...Array(4 - componentCount).fill(0)].forEach((code) => this.setInt8ToEntry(code));
    }

    this._currentEntryCount++;

    return this;
  }

  appendSignedShortEntry(tag: number, values: number[]): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = values.length;

    this.setInt16ToEntry(tag); // Tag
    this.setInt16ToEntry(TagFormat.SignedShort); // Format
    this.setInt32ToEntry(componentCount); // Component's Count

    const componentSize = COMPONENT_SIZE_BY_FORMAT[TagFormat.SignedShort]; // 2 Bytes
    const payloadSize = componentSize * componentCount;

    if (payloadSize > 4) {
      this.setInt32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.
      values.forEach((value) => this.setInt16ToDataArea(value, true));
    } else {
      [...values, ...Array(2 - componentCount).fill(0)].forEach((value) => this.setInt16ToEntry(value, true));
    }

    this._currentEntryCount++;

    return this;
  }

  appendSignedLongEntry(tag: number, values: number[]): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = values.length;

    this.setInt16ToEntry(tag); // Tag
    this.setInt16ToEntry(TagFormat.SignedLong); // Format
    this.setInt32ToEntry(componentCount); // Component's Count

    const componentSize = COMPONENT_SIZE_BY_FORMAT[TagFormat.SignedLong]; // 4 Bytes
    const payloadSize = componentSize * componentCount;

    if (payloadSize > 4) {
      this.setInt32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.
      values.forEach((value) => this.setInt32ToDataArea(value, true));
    } else {
      values.forEach((value) => this.setInt32ToEntry(value, true));
    }

    this._currentEntryCount++;

    return this;
  }

  appendSignedRationalEntry(tag: number, values: [number, number][]): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = values.length;

    this.setInt16ToEntry(tag); // Tag
    this.setInt16ToEntry(TagFormat.SignedRational); // Format
    this.setInt32ToEntry(componentCount); // Component's Count
    this.setInt32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.

    values.forEach(([numerator, denominator]) => {
      this.setInt32ToDataArea(numerator, true);
      this.setInt32ToDataArea(denominator, true);
    });

    this._currentEntryCount++;

    return this;
  }

  appendUnsignedShortEntry(tag: number, values: number[]): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = values.length;

    this.setInt16ToEntry(tag); // Tag
    this.setInt16ToEntry(TagFormat.UnsignedShort); // Format
    this.setInt32ToEntry(componentCount); // Component's Count

    const componentSize = COMPONENT_SIZE_BY_FORMAT[TagFormat.UnsignedShort]; // 2 Bytes
    const payloadSize = componentSize * componentCount;

    if (payloadSize > 4) {
      this.setInt32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.
      values.forEach((value) => this.setInt16ToDataArea(value));
    } else {
      [...values, ...Array(2 - componentCount).fill(0)].forEach((value) => this.setInt16ToEntry(value));
    }

    this._currentEntryCount++;

    return this;
  }

  appendUnsignedLongEntry(tag: number, values: number[]): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = values.length;

    this.setInt16ToEntry(tag); // Tag
    this.setInt16ToEntry(TagFormat.UnsignedLong); // Format
    this.setInt32ToEntry(componentCount); // Component's Count

    const componentSize = COMPONENT_SIZE_BY_FORMAT[TagFormat.UnsignedLong]; // 4 Bytes
    const payloadSize = componentSize * componentCount;

    if (payloadSize > 4) {
      this.setInt32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.
      values.forEach((value) => this.setInt32ToDataArea(value));
    } else {
      values.forEach((value) => this.setInt32ToEntry(value));
    }

    this._currentEntryCount++;

    return this;
  }

  appendUnsignedRationalEntry(tag: number, values: [number, number][]): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = values.length;

    this.setInt16ToEntry(tag); // Tag
    this.setInt16ToEntry(TagFormat.UnsignedRational); // Format
    this.setInt32ToEntry(componentCount); // Component's Count
    this.setInt32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.

    values.forEach(([numerator, denominator]) => {
      this.setInt32ToDataArea(numerator);
      this.setInt32ToDataArea(denominator);
    });

    this._currentEntryCount++;

    return this;
  }
}
