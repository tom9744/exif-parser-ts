import { IIFDEntry } from "./IFDEntry.model";
import { ImageFileDirectory } from "./ImageFileDirectory.model";

export interface IIFD0 {
  entries: IIFDEntry[];
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
    const exifOffsetEntry = this._entries.find((entry) => entry.isExifOffset);

    if (!exifOffsetEntry) {
      return;
    }

    this._offsetToEXIF = exifOffsetEntry.payload as number;
  }

  private setOffsetToGPS(): void {
    const gpsInfoEntry = this._entries.find((entry) => entry.isGPSInfo);

    if (!gpsInfoEntry) {
      return;
    }

    this._offsetToGPS = gpsInfoEntry.payload as number;
  }
}
