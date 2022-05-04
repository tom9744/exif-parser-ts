import { MetaChildBoxType } from "../../constants/box-type.constant";
import { readUint32AsString } from "../../utils";
import { ItemInfoBox } from "./ChildBox/ItemInfoBox.model";
import { ItemLocationBox } from "./ChildBox/ItemLocationBox.model";

const META_BOX_TYPE = "meta";
const BOX_TYPE_OFFSET = 4;

function findMetaBoxFromArrayBuffer(arrayBuffer: ArrayBuffer): {
  size: number;
  offset: number;
} {
  const dataView = new DataView(arrayBuffer);

  for (let offset = 0; offset < dataView.byteLength; offset++) {
    const value = readUint32AsString(dataView, offset);

    if (value === META_BOX_TYPE) {
      return {
        offset: offset - 4,
        size: dataView.getUint32(offset - 4),
      };
    }
  }

  throw new Error("Could not find a meta box from the array buffer");
}

export interface IMetaBox {
  itemInfoBox: ItemInfoBox | null;
}

export class MetaBox implements IMetaBox {
  private dataView: DataView;
  private offset = 0;
  private size = 0;
  private ilocOffset = 0;
  private iinfOffset = 0;

  constructor(arrayBuffer: ArrayBuffer) {
    const { offset, size } = findMetaBoxFromArrayBuffer(arrayBuffer);

    this.offset = offset;
    this.size = size;
    // NOTE: 오프셋 + 크기 = 필요한 총 길이
    this.dataView = new DataView(arrayBuffer.slice(0, offset + size));

    this.validateBoxType();
    this.updateOffsets();
  }

  get itemInfoBox(): ItemInfoBox | null {
    try {
      return new ItemInfoBox(this.dataView, this.iinfOffset);
    } catch (error) {
      console.error(error);
      return null; // TODO: More explicit error message.
    }
  }

  get itemLocationBox(): ItemLocationBox | null {
    try {
      return new ItemLocationBox(this.dataView, this.ilocOffset);
    } catch (error) {
      console.error(error);
      return null; // TODO: More explicit error message.
    }
  }

  private validateBoxType(): void {
    const boxType = readUint32AsString(this.dataView, this.offset + BOX_TYPE_OFFSET);

    if (boxType !== META_BOX_TYPE) {
      throw new Error("Invaild meta box offset");
    }
  }

  private updateOffsets(): void {
    for (let offset = 0; offset < this.size - 4; offset++) {
      const value = readUint32AsString(this.dataView, offset);

      if (value === MetaChildBoxType.ItemLocationBox) {
        this.ilocOffset = offset - 4;
      }

      if (value === MetaChildBoxType.ItemInfoBox) {
        this.iinfOffset = offset - 4;
      }
    }
  }
}
