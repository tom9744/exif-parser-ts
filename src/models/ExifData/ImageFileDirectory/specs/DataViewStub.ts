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

    // this.dataView.setUint16(0, 0x010f); // Tag (= Make)
    // this.dataView.setUint16(2, 0x0002); // Format (= ASCII String)
    // this.dataView.setUint32(4, 0x0006); // Component Count
    // this.dataView.setUint32(8, 0x0020); // Payload (= Data's Offset)

    // this.dataView.setUint16(0, 0x0112); // Tag (= Orientation)
    // this.dataView.setUint16(2, 0x0003); // Format (= Unsinged Short)
    // this.dataView.setUint32(4, 0x0001); // Component Count
    // this.dataView.setUint16(8, 0x0006); // Payload (= Data)

    // this.dataView.setUint16(0, 0x8769); // Tag (= ExifOffset)
    // this.dataView.setUint16(2, 0x0004); // Format (= Unsinged Long)
    // this.dataView.setUint32(4, 0x0001); // Component Count
    // this.dataView.setUint32(8, 0x00e0); // Payload (= Data)

    // this.dataView.setUint16(0, 0x0211); // Tag (= YCbCrCoefficients)
    // this.dataView.setUint16(2, 0x0005); // Format (= Unsigned Rational)
    // this.dataView.setUint32(4, 0x0003); // Component Count
    // this.dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    // this.dataView.setUint16(0, 0x0092); // Tag (= Random Number)
    // this.dataView.setUint16(2, 0x0008); // Format (= Singed Short)
    // this.dataView.setUint32(4, 0x0001); // Component Count
    // this.dataView.setInt16(8, 0xfff4); // Payload (= Data)

    // this.dataView.setUint16(0, 0x1769); // Tag (= Random Number)
    // this.dataView.setUint16(2, 0x0009); // Format (= Unsinged Long)
    // this.dataView.setUint32(4, 0x00000001); // Component Count
    // this.dataView.setUint32(8, 0xfffffebf); // Payload (= Data)

    // this.dataView.setUint16(0, 0x1211); // Tag (= Random Number)
    // this.dataView.setUint16(2, 0x000a); // Format (= Unsigned Rational)
    // this.dataView.setUint32(4, 0x0003); // Component Count
    // this.dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    // this.dataView.setUint16(0, 0x9721); // Tag (= Random Number)
    // this.dataView.setUint16(2, 0x000b); // Format (= Unsigned Rational)
    // this.dataView.setUint32(4, 0x0004); // Component Count
    // this.dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    // this.dataView.setUint16(0, 0x8631); // Tag (= Random Number)
    // this.dataView.setUint16(2, 0x000c); // Format (= Unsigned Rational)
    // this.dataView.setUint32(4, 0x0003); // Component Count
    // this.dataView.setUint32(8, 0x0010); // Payload (= Data's Offset)

    // this.dataView.setUint8(this.byteAlignOffset + 32, 0x0041); // A
    // this.dataView.setUint8(this.byteAlignOffset + 33, 0x0070); // p
    // this.dataView.setUint8(this.byteAlignOffset + 34, 0x0070); // p
    // this.dataView.setUint8(this.byteAlignOffset + 35, 0x006c); // l
    // this.dataView.setUint8(this.byteAlignOffset + 36, 0x0065); // e
    // this.dataView.setUint8(this.byteAlignOffset + 37, 0x0000); // \0
  }

  private setUint8ToEntry(value: number): void {
    if (this._dataOffset + 1 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    this._dataView.setUint8(this._entryOffset, value);
    this._entryOffset++;
  }

  private setUint16ToEntry(value: number): void {
    if (this._dataOffset + 2 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    this._dataView.setUint16(this._entryOffset, value);
    this._entryOffset += 2;
  }

  private setUint32ToEntry(value: number): void {
    if (this._dataOffset + 4 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    this._dataView.setUint32(this._entryOffset, value);
    this._entryOffset += 4;
  }

  private setUint8ToDataArea(value: number): void {
    if (this._dataOffset + 1 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }

    this._dataView.setUint8(this._dataOffset, value);
    this._dataOffset++;
  }

  private setUint16ToDataArea(value: number): void {
    if (this._dataOffset + 2 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }
    this._dataView.setUint16(this._dataOffset, value);
    this._dataOffset += 2;
  }

  private setUint32ToDataArea(value: number): void {
    if (this._dataOffset + 4 > this.size) {
      throw new RangeError("지정된 DataView의 크기를 초과했습니다.");
    }
    this._dataView.setUint32(this._dataOffset, value);
    this._dataOffset += 4;
  }

  appendStringEntry(tag: number, value: string): this {
    if (this._currentEntryCount >= this._maxEntryCount) {
      throw new RangeError("지정된 엔트리 개수보다 더 많은 엔트리를 추가할 수 없습니다.");
    }

    const componentCount = value.length;

    this.setUint16ToEntry(tag); // Tag
    this.setUint16ToEntry(TagFormat.ASCIIString); // Format
    this.setUint32ToEntry(componentCount); // Component's Count

    const componentSize = COMPONENT_SIZE_BY_FORMAT[TagFormat.ASCIIString]; // 1 Byte
    const payloadSize = componentSize * componentCount;

    const charCodes: number[] = [];

    for (let index = 0; index < value.length; index++) {
      const charCode = value.charCodeAt(index);

      charCodes.push(charCode);
    }

    if (payloadSize > 4) {
      this.setUint32ToEntry(this._dataOffset - this.BYTE_ALIGN_OFFSET); // NOTE: 데이터 오프셋은 원본 값을 저장한다.
      charCodes.forEach((code) => this.setUint8ToDataArea(code));
    } else {
      charCodes.forEach((code) => this.setUint8ToEntry(code));
    }

    this._currentEntryCount++;

    return this;
  }
}
