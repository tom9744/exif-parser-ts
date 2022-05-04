import { MetaChildBoxType } from "../../../constants/box-type.constant";
import { readUint32AsString } from "../../../utils";

type ExtentInfo = {
  extentOffset: number;
  extentLength: number;
};

interface IItemLocationEntry {
  itemId: number;
  dataReferenceIndex: number;
  baseOffset: number;
  extentCount: number;
  extentInfos: ExtentInfo[];
}

export class ItemLocationEntry implements IItemLocationEntry {
  private _itemId: number;
  private _dataReferenceIndex: number;
  private _baseOffset: number;
  private _extentCount: number;
  private _extentInfos: {
    extentOffset: number;
    extentLength: number;
  }[];

  constructor(args: IItemLocationEntry) {
    const { itemId, dataReferenceIndex, baseOffset, extentCount, extentInfos } = args;

    this._itemId = itemId;
    this._dataReferenceIndex = dataReferenceIndex;
    this._baseOffset = baseOffset;
    this._extentCount = extentCount;
    this._extentInfos = extentInfos;
  }

  get itemId(): number {
    return this._itemId;
  }
  get dataReferenceIndex(): number {
    return this._dataReferenceIndex;
  }
  get baseOffset(): number {
    return this._baseOffset;
  }
  get extentCount(): number {
    return this._extentCount;
  }
  get extentInfos(): ExtentInfo[] {
    return { ...this._extentInfos };
  }
}

interface IItemLocationBox {
  offsetSize: number;
  lengthSize: number;
  baseOffsetSize: number;
  itemCount: number;
  items: ItemLocationEntry[];
  finditemLocationById(itemId: number): ItemLocationEntry | null;
}

export class ItemLocationBox implements IItemLocationBox {
  private _dataView: DataView;
  private _offset: number;
  private _size: number;
  private _offsetSize: number = 0;
  private _lengthSize: number = 0;
  private _baseOffsetSize: number = 0;
  private _itemCount: number = 0;
  private _items: ItemLocationEntry[] = [];

  constructor(dataView: DataView, offset: number) {
    this._offset = offset;
    this._size = dataView.getUint32(offset);
    this._dataView = dataView;

    this.validateBoxType();
    this.updateProperties();
  }

  get offsetSize(): number {
    return this._offsetSize;
  }
  get lengthSize(): number {
    return this._lengthSize;
  }
  get baseOffsetSize(): number {
    return this._baseOffsetSize;
  }
  get itemCount(): number {
    return this._itemCount;
  }
  get items(): ItemLocationEntry[] {
    return [...this._items];
  }

  private validateBoxType(): void {
    const boxType = readUint32AsString(this._dataView, this._offset + 4);

    if (boxType !== MetaChildBoxType.ItemLocationBox) {
      throw new Error("Invalid item location box offset");
    }
  }

  private updateProperties(): void {
    const firstByte = this._dataView.getUint8(this._offset + 12);
    const secontByte = this._dataView.getUint8(this._offset + 13);
    const offsetSize = this.splitUint8(firstByte)[0];
    const lengthSize = this.splitUint8(firstByte)[1];
    const baseOffsetSize = secontByte >> 4;
    const itemCount = this._dataView.getUint16(this._offset + 14);
    const items: ItemLocationEntry[] = [];

    if (itemCount > 0) {
      let offset = this._offset + 16;

      while (offset < this._offset + this._size) {
        const itemId = this._dataView.getUint16(offset);
        const dataReferenceIndex = this._dataView.getUint16(offset + 2);
        const baseOffset = this._dataView.getUint16(offset + 4); // NOTE: Should be double-checked!
        const extentCount = this._dataView.getUint16(offset + 6);
        const extentInfos: ExtentInfo[] = [];

        for (let n = 0; n < extentCount; n++) {
          extentInfos.push({
            extentOffset: this._dataView.getUint32(offset + 8 + 2 * n),
            extentLength: this._dataView.getUint32(offset + 12 + 2 * n),
          });
        }

        items.push(
          new ItemLocationEntry({
            itemId,
            dataReferenceIndex,
            baseOffset,
            extentCount,
            extentInfos,
          })
        );

        offset += 6 + (baseOffsetSize || 2) + offsetSize + lengthSize;
      }
    }

    this._offsetSize = offsetSize;
    this._lengthSize = lengthSize;
    this._baseOffsetSize = baseOffsetSize;
    this._itemCount = itemCount;
    this._items = items;
  }

  /**
   * Treat an unsigned 8-bit integer into two unsigned 4-bit integers,
   * which consist of a value taken from the set of {0, 4, 8}.
   */
  private splitUint8(value: number): [number, number] {
    switch (value) {
      case 0:
        return [0, 0];
      case 4:
        return [0, 4];
      case 8:
        return [0, 8];
      case 64:
        return [4, 0];
      case 68:
        return [4, 4];
      case 72:
        return [4, 8];
      case 128:
        return [8, 0];
      case 132:
        return [8, 4];
      case 136:
        return [8, 8];
      default:
        throw new Error("An unexpected value has been passed.");
    }
  }

  finditemLocationById(itemId: number): ItemLocationEntry | null {
    const result = this._items.find((itemLocationEntry) => itemLocationEntry.itemId === itemId);
    return result || null;
  }
}
