import { IIFDEntryModel } from "./IFDEntryFactory";
import { ImageFileDirectory } from "./ImageFileDirectory.model";

export interface IIFD0 {
  entries: IIFDEntryModel[];
  offsetToIFD1: number;
  offsetToEXIF: number | null;
  offsetToGPS: number | null;
}

export class IFD0 extends ImageFileDirectory implements IIFD0 {
  private _offsetToIFD1: number;
  private _offsetToEXIF: number | null = null;
  private _offsetToGPS: number | null = null;

  get offsetToIFD1(): number {
    return this._offsetToIFD1;
  }

  get offsetToEXIF(): number | null {
    return this._offsetToEXIF;
  }

  get offsetToGPS(): number | null {
    return this._offsetToGPS;
  }

  constructor(dataView: DataView, firstIFDOffset: number, isLittle: boolean) {
    super(dataView, firstIFDOffset, isLittle);

    // NOTE: IFD0 엔트리 목록이 끝나는 위치에 다음 IFD(= IFD1)의 Offset이 저장되어 있습니다.
    const farmostOffset = this._offsetToFirstEntry + this._entries.length * 12;

    this._offsetToIFD1 = dataView.getUint32(farmostOffset, isLittle);

    this.setOffsetToEXIF();
    this.setOffsetToGPS();
  }

  private setOffsetToEXIF(): void {
    const targetEntry = this._entries.find((entry) => entry.isExifTag);

    if (!targetEntry) {
      return;
    }

    this._offsetToEXIF = (targetEntry.data as number) ?? null;
  }

  private setOffsetToGPS(): void {
    const targetEntry = this._entries.find((entry) => entry.isGpsTag);

    if (!targetEntry) {
      return;
    }

    this._offsetToGPS = (targetEntry.data as number) ?? null;
  }
}
