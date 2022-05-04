import { MetaChildBoxType } from "../../../constants/box-type.constant";
import { readUint32AsString } from "../../../utils";

type ItemInfoEntry = {
  boxSize: number;
  itemId: number;
  itemProtectionIndex: number;
  itemName: string;
};

interface IItemInfoBox {
  entryCount: number;
  itemInfos: ItemInfoEntry[];
  findExifItemInfo(): ItemInfoEntry | null;
}

export class ItemInfoBox implements IItemInfoBox {
  private _dataView: DataView;
  private _size: number;
  private _offset: number;
  private _entryCount: number = 0;
  private _itemInfos: ItemInfoEntry[] = [];

  constructor(dataView: DataView, offset: number) {
    this._offset = offset;
    this._size = dataView.getUint32(offset);
    this._dataView = dataView;

    this.validateBoxType();
    this.updateProperties();
  }

  get entryCount(): number {
    return this._entryCount;
  }

  get itemInfos(): ItemInfoEntry[] {
    return [...this._itemInfos];
  }

  private validateBoxType(): void {
    const boxType = readUint32AsString(this._dataView, this._offset + 4);

    if (boxType !== MetaChildBoxType.ItemInfoBox) {
      throw new Error("Invalid item info box offset");
    }
  }

  private updateProperties(): void {
    const itemInfos: ItemInfoEntry[] = [];
    const entryCount = this._dataView.getUint16(this._offset + 12);

    if (entryCount > 0) {
      let offset = this._offset + 14;

      while (offset < this._offset + this._size) {
        const slidingWindow = readUint32AsString(this._dataView, offset);

        if (slidingWindow === MetaChildBoxType.ItemInfoEntry) {
          const baseOffset = offset - 4;

          itemInfos.push({
            boxSize: this._dataView.getUint32(baseOffset),
            itemId: this._dataView.getUint16(baseOffset + 12),
            itemProtectionIndex: this._dataView.getUint16(baseOffset + 14),
            itemName: readUint32AsString(this._dataView, baseOffset + 16),
          });

          offset += this._dataView.getUint32(baseOffset) - 4;
        }
        offset += 1;
      }
    }

    this._entryCount = entryCount;
    this._itemInfos = itemInfos;
  }

  findExifItemInfo(): ItemInfoEntry | null {
    const result = this._itemInfos.find((itemInfoEntry) => itemInfoEntry.itemName === "Exif");
    return result || null;
  }
}
