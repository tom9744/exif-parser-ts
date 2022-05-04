import { ExifData } from "./models/ExifData/ExifData.model";
import { MetaBox } from "./models/MetaBox/MetaBox.model";

type App1Marker = { offset: number; size: number };

type AllowedFileType = "image/jpeg" | "image/heic";

function isAllowedFileType(fileType: string): fileType is AllowedFileType {
  return fileType === "image/jpeg" || fileType === "image/heic";
}

function findApp1Marker(arrayBuffer: ArrayBuffer): App1Marker | undefined {
  const dataView = new DataView(arrayBuffer);

  for (let offset = 0; offset < arrayBuffer.byteLength - 2; offset += 2) {
    const value = dataView.getUint16(offset);

    // NOTE: App1 Marker, Exif 데이터 포함.
    if (value === 0xffe1) {
      return { offset, size: dataView.getUint16(offset + 2) };
    }

    // NOTE: Start of Scan, 헤더 영역 종료.
    if (value === 0xffda) {
      break;
    }
  }
}

function parseHEIC(arrayBuffer: ArrayBuffer): ExifData | undefined {
  if (!arrayBuffer) {
    return;
  }

  const metaBox = new MetaBox(arrayBuffer);
  const exifItemInfo = metaBox.itemInfoBox?.findExifItemInfo();

  if (!exifItemInfo) {
    return;
  }

  const exifItemLocation = metaBox.itemLocationBox?.finditemLocationById(exifItemInfo.itemId);

  if (!exifItemLocation?.extentInfos?.[0]) {
    return;
  }

  return new ExifData(arrayBuffer, exifItemLocation.extentInfos[0].extentOffset, exifItemLocation.extentInfos[0].extentLength);
}

function parseJPEG(arrayBuffer: ArrayBuffer): ExifData | undefined {
  const marker = findApp1Marker(arrayBuffer);

  if (!marker) {
    return;
  }

  return new ExifData(arrayBuffer, marker.offset, marker.size);
}

export async function extractExifTags(file: File): Promise<ExifData | null> {
  if (!file) {
    throw new Error(`No file has been provided.`);
  }

  if (!isAllowedFileType(file.type)) {
    throw new Error(`The file tpye is not supported, ${file.type}`);
  }

  const arrayBuffer = await file.arrayBuffer();

  let result: ExifData | null = null;

  switch (file.type) {
    case "image/heic":
      result = parseHEIC(arrayBuffer) ?? null;
      break;
    case "image/jpeg":
      result = parseJPEG(arrayBuffer) ?? null;
      break;
  }

  return result;
}
