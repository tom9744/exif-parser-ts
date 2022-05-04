import { readUint32AsString } from "../../../utils";

const BOX_SIZE_OFFSET = 0;
const BOX_TYPE_OFFSET = 4;
const MAJOR_BRAND_OFFSET = 8;
const MINOR_VERSION_OFFSET = 12;
const COMPATIBLE_BRANDS_OFFSET = 16;

export interface IFileTypeBox {
  size: number;
  majorBrand: string;
  minorVersion: number;
  compatibleBrands: string[];
}

/**
 * Reference: https://sce.umkc.edu/faculty-sites/lizhu/teaching/2021.spring.video/ref/mp4.pdf, Chapter 4.3 File Type Box
 */
export class FileTypeBox implements IFileTypeBox {
  size: number;
  majorBrand: string;
  minorVersion: number;
  compatibleBrands: string[] = [];

  constructor(arrayBuffer: ArrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    const boxSize = dataView.getUint32(BOX_SIZE_OFFSET);
    const boxType = readUint32AsString(dataView, BOX_TYPE_OFFSET);

    if (boxType !== "ftyp") {
      throw new Error("Invaild box type");
    }

    this.size = boxSize;
    this.majorBrand = readUint32AsString(dataView, MAJOR_BRAND_OFFSET);
    this.minorVersion = dataView.getUint32(MINOR_VERSION_OFFSET);

    for (let offset = COMPATIBLE_BRANDS_OFFSET; offset < boxSize; offset += 4) {
      const brand = readUint32AsString(dataView, offset);
      this.compatibleBrands.push(brand);
    }
  }
}
