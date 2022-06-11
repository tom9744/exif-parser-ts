export type EXIFPrivateTag =
  | "ExposureTime"
  | "FNumber"
  | "ExposureProgram"
  | "SpectralSensitivity"
  | "PhotographicSensitivity"
  | "OECF"
  | "SensitivityType"
  | "StandardOutputSensitivity"
  | "RecommendedExposureIndex"
  | "ISOSpeed"
  | "ISOSpeedLatitudeyyy"
  | "ISOSpeedLatitudezzz"
  | "ExifVersion"
  | "DateTimeOriginal"
  | "DateTimeDigitized"
  | "ComponentsConfiguration"
  | "CompressedBitsPerPixel"
  | "ShutterSpeedValue"
  | "ApertureValue"
  | "BrightnessValue"
  | "ExposureCompensation"
  | "MaxApertureValue"
  | "SubjectDistance"
  | "MeteringMode"
  | "LightSource"
  | "Flash"
  | "FocalLength"
  | "SubjectArea"
  | "MakerNote"
  | "UserComment"
  | "SubSecTime"
  | "SubSecTimeOriginal"
  | "SubSecTimeDigitized"
  | "FlashpixVersion"
  | "ColorSpace"
  | "ExifImageWidth"
  | "ExifImageHeight"
  | "RelatedSoundFile"
  | "Interoperability IFD Pointer"
  | "FlashEnergy"
  | "SpatialFrequencyResponse"
  | "FocalPlaneXResolution"
  | "FocalPlaneYResolution"
  | "FocalPlaneResolutionUnit"
  | "SubjectLocation"
  | "ExposureIndex"
  | "SensingMethod"
  | "FileSource"
  | "SceneType"
  | "CFAPattern"
  | "CustomRendered"
  | "ExposureMode"
  | "WhiteBalance"
  | "DigitalZoomRatio"
  | "FocalLengthIn35mmFormat"
  | "SceneCaptureType"
  | "GainControl"
  | "Contrast"
  | "Saturation"
  | "Sharpness"
  | "SubjectDistanceRange"
  | "ImageUniqueID"
  | "OwnerName"
  | "SerialNumber"
  | "LensInfo"
  | "LensMake"
  | "LensModel"
  | "LensSerialNumber"
  | "Gamma";

export const IFD_EXIF_TAG_NAME_BY_TAG_ID = Object.freeze<{ [tagNumber: number]: EXIFPrivateTag }>({
  0x829a: "ExposureTime",
  0x829d: "FNumber",

  0x8822: "ExposureProgram",
  0x8824: "SpectralSensitivity",
  0x8827: "PhotographicSensitivity", // ISO
  0x8828: "OECF", // Optoelectric Coefficient
  0x8830: "SensitivityType",
  0x8831: "StandardOutputSensitivity",
  0x8832: "RecommendedExposureIndex",
  0x8833: "ISOSpeed",
  0x8834: "ISOSpeedLatitudeyyy",
  0x8835: "ISOSpeedLatitudezzz",

  0x9000: "ExifVersion",
  0x9003: "DateTimeOriginal",
  0x9004: "DateTimeDigitized",

  0x9101: "ComponentsConfiguration",
  0x9102: "CompressedBitsPerPixel",
  0x9201: "ShutterSpeedValue",
  0x9202: "ApertureValue",
  0x9203: "BrightnessValue",
  0x9204: "ExposureCompensation",
  0x9205: "MaxApertureValue",
  0x9206: "SubjectDistance",
  0x9207: "MeteringMode",
  0x9208: "LightSource",
  0x9209: "Flash",
  0x920a: "FocalLength",

  0x9214: "SubjectArea",

  0x927c: "MakerNote",
  0x9286: "UserComment",
  0x9290: "SubSecTime",
  0x9291: "SubSecTimeOriginal",
  0x9292: "SubSecTimeDigitized",

  0xa000: "FlashpixVersion",
  0xa001: "ColorSpace",
  0xa002: "ExifImageWidth",
  0xa003: "ExifImageHeight",
  0xa004: "RelatedSoundFile",
  0xa005: "Interoperability IFD Pointer",

  0xa20b: "FlashEnergy",
  0xa20c: "SpatialFrequencyResponse",
  0xa20e: "FocalPlaneXResolution",
  0xa20f: "FocalPlaneYResolution",

  0xa210: "FocalPlaneResolutionUnit",
  0xa214: "SubjectLocation",
  0xa215: "ExposureIndex",
  0xa217: "SensingMethod",

  0xa300: "FileSource",
  0xa301: "SceneType",
  0xa302: "CFAPattern",

  0xa401: "CustomRendered",
  0xa402: "ExposureMode",
  0xa403: "WhiteBalance",
  0xa404: "DigitalZoomRatio",
  0xa405: "FocalLengthIn35mmFormat",
  0xa406: "SceneCaptureType",
  0xa407: "GainControl",
  0xa408: "Contrast",
  0xa409: "Saturation",
  0xa40a: "Sharpness",
  0xa40c: "SubjectDistanceRange",

  0xa420: "ImageUniqueID",

  0xa430: "OwnerName",
  0xa431: "SerialNumber",
  0xa432: "LensInfo",
  0xa433: "LensMake",
  0xa434: "LensModel",
  0xa435: "LensSerialNumber",

  0xa500: "Gamma",
});
