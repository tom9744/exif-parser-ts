/**
 * According to the Exif Version 2.3 specification, IFD0 and IFD1 entries share the following tags.
 * (For more details, See 4.6.2 IFD Structure)
 *
 * The type definition below includes all possible tag names regardless of their notation types.
 *
 * [Notation Type]
 * M: Mandatory
 * R: Recommended
 * O: Optional
 * N: Not allowed
 * J: Not allowed (Included in JPEG Marker)
 *
 * Reference: https://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf
 */
export type IFDTIFFTag =
  | "ImageWidth"
  | "ImageHeight"
  | "BitsPerSample"
  | "Compression"
  | "PhotometricInterpretation"
  | "ImageDescription"
  | "Make"
  | "Model"
  | "StripOffsets"
  | "Orientation"
  | "SamplesPerPixel"
  | "RowsPerStrip"
  | "StripByteCounts"
  | "XResolution"
  | "YResolution"
  | "PlanarConfiguration"
  | "ResolutionUnit"
  | "TransferFunction"
  | "Software"
  | "DateTime"
  | "Artist"
  | "WhitePoint"
  | "PrimaryChromaticities"
  | "JPEGInterchangeFormat" // Thumbnail Offest
  | "JPEGInterchangeFormatLength" // Thumbnail Length
  | "YCbCrCoefficients"
  | "YCbCrSubSampling"
  | "YCbCrPositioning"
  | "ReferenceBlackWhite"
  | "Copyright"
  | "ExifIFDPointer" // EXIF Tag
  | "GPSInfoIFDPointer"; // GPS Tag

export const IFD_TIFF_TAG_NAME_BY_TAG_ID: Readonly<{ [tagNumber: number]: IFDTIFFTag }> = Object.freeze({
  0x0100: "ImageWidth",
  0x0101: "ImageHeight",
  0x0102: "BitsPerSample",
  0x0103: "Compression",
  0x0106: "PhotometricInterpretation",
  0x010e: "ImageDescription",
  0x010f: "Make",

  0x0110: "Model",
  0x0111: "StripOffsets",
  0x0112: "Orientation",
  0x0115: "SamplesPerPixel",
  0x0116: "RowsPerStrip",
  0x0117: "StripByteCounts",
  0x011a: "XResolution",
  0x011b: "YResolution",
  0x011c: "PlanarConfiguration",

  0x0128: "ResolutionUnit",
  0x012d: "TransferFunction",

  0x0131: "Software",
  0x0132: "DateTime",
  0x013b: "Artist",
  0x013e: "WhitePoint",
  0x013f: "PrimaryChromaticities",

  0x0201: "JPEGInterchangeFormat",
  0x0202: "JPEGInterchangeFormatLength",

  0x0211: "YCbCrCoefficients",
  0x0212: "YCbCrSubSampling",
  0x0213: "YCbCrPositioning",
  0x0214: "ReferenceBlackWhite",

  0x8298: "Copyright",
  0x8769: "ExifIFDPointer",
  0x8825: "GPSInfoIFDPointer",
});
