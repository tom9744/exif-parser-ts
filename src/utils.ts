import { EntryData } from "./models/ExifData/ImageFileDirectory/IFDEntryFactory";

export function readUint32AsString(dataView: DataView, offset: number) {
  const charArray = [];

  for (let n = offset; n < offset + 4; n++) {
    try {
      charArray.push(String.fromCharCode(dataView.getInt8(n)));
    } catch (error) {
      throw error;
    }
  }

  return charArray.join("");
}

export function readDataViewAsString(dataView: DataView, offset: number, length: number) {
  const charArray = [];

  for (let n = offset; n < offset + length; n++) {
    charArray.push(String.fromCharCode(dataView.getInt8(n)));
  }

  return charArray.join("");
}

export function isNumberArray(data: EntryData): data is number[] {
  return Array.isArray(data) && !data.some((elem) => typeof elem !== "number");
}

export function isNumber(data: EntryData): data is number {
  return !Array.isArray(data) && typeof data === "number";
}

export function isString(data: EntryData): data is string {
  return !Array.isArray(data) && typeof data === "string";
}
