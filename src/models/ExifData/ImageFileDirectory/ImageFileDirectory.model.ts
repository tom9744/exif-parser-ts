import { IFDEntry, IIFDEntry } from "./IFDEntry.model";

export interface IImageFileDirectory {
  entries: IIFDEntry[];
}

export class ImageFileDirectory implements IImageFileDirectory {
  protected _baseOffset: number;
  protected _offsetToFirstEntry: number;
  protected _entries: IFDEntry[];

  get entries(): IFDEntry[] {
    return [...this._entries];
  }

  constructor(dataView: DataView, offsetToIFD0: number, isLittle: boolean) {
    this._baseOffset = offsetToIFD0 + 10; // NOTE: Byte Align 헤더의 Offset(= 10)을 기준으로 합니다.
    this._offsetToFirstEntry = this._baseOffset + 2; // NOTE: 실제 IFD 엔트리는 Entry Count 데이터(= 2 Bytes) 이후에 위치합니다.

    const entries: IFDEntry[] = [];
    const entryCount = dataView.getUint16(this._baseOffset, isLittle);

    for (let n = 0; n < entryCount; n++) {
      const entry = new IFDEntry(
        dataView,
        this._offsetToFirstEntry + 12 * n, // NOTE: IFD Entry는 12 Bytes로 구성됩니다.
        isLittle
      );

      entries.push(entry);
    }

    this._entries = entries;
  }
}
