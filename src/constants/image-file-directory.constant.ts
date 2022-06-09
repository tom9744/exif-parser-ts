/**
 * IFD 엔트리에 포함된 컴포넌트 한 개 당 크기입니다.
 */
export const COMPONENT_SIZE_BY_FORMAT: Record<number, number> = {
  0x01: 1, // Unsigned Byte
  0x02: 1, // ASCII String
  0x03: 2, // Unsigned Short
  0x04: 4, // Unsigned Long
  0x05: 8, // Unsigned Rational
  0x06: 1, // Signed Byte
  0x07: 1, // Undefined
  0x08: 2, // Signed Short
  0x09: 4, // Signed Long
  0x0a: 8, // Signed Rational
  0x0b: 4, // Single Float
  0x0c: 8, // Double Float
};

/**
 * IFD 엔트리의 태그 이름 정보입니다.
 *
 * NOTE: 중복된 이름이 있어, Enum 형식으로 정의하지 못했습니다.
 */
export const TAG_NAME_BY_TAG_ID: Record<number, string> = {
  0x0001: "InteropIndex",
  0x0002: "InteropVersion",
  0x0120: "FreeOffsets",
  0x0121: "FreeByteCounts",
  0x0123: "GrayResponseCurve",
  0x0124: "T4Options",
  0x0125: "T6Options",
  0x0140: "ColorMap",
  0x0144: "TileOffsets",
  0x0145: "TileByteCounts",
  0x0146: "BadFaxLines",
  0x0147: "CleanFaxData",
  0x0148: "ConsecutiveBadFaxLines",
  0x014a: "SubIFD",
  0x014d: "InkNames",
  0x014e: "NumberofInks",
  0x0150: "DotRange",
  0x0152: "ExtraSamples",
  0x0154: "SMinSampleValue",
  0x0155: "SMaxSampleValue",
  0x0156: "TransferRange",
  0x0157: "ClipPath",
  0x0158: "XClipPathUnits",
  0x0159: "YClipPathUnits",
  0x015a: "Indexed",
  0x015b: "JPEGTables",
  0x015f: "OPIProxy",
  0x0190: "GlobalParametersIFD",
  0x0191: "ProfileType",
  0x0192: "FaxProfile",
  0x0193: "CodingMethods",
  0x0194: "VersionYear",
  0x0195: "ModeNumber",
  0x01b1: "Decode",
  0x01b2: "DefaultImageColor",
  0x01b3: "T82Options",
  0x01b5: "JPEGTables",
  0x0200: "JPEGProc",
  0x0203: "JPEGRestartInterval",
  0x0205: "JPEGLosslessPredictors",
  0x0206: "JPEGPointTransforms",
  0x0207: "JPEGQTables",
  0x0208: "JPEGDCTables",
  0x0209: "JPEGACTables",
  0x022f: "StripRowCounts",
  0x03e7: "USPTOMiscellaneous",
  0x1000: "RelatedImageFileFormat",
  0x1001: "RelatedImageWidth",
  0x1002: "RelatedImageHeight",
  0x4747: "XP_DIP_XML",
  0x4748: "StitchInfo",
  0x800d: "ImageID",
  0x80a3: "WangTag1",
  0x80a4: "WangAnnotation",
  0x80a5: "WangTag3",
  0x80a6: "WangTag4",
  0x80e3: "Matteing",
  0x80e4: "DataType",
  0x80e5: "ImageDepth",
  0x80e6: "TileDepth",
  0x827d: "Model2",
  0x828f: "BatteryLevel",
  0x8290: "KodakIFD",
  0x82a5: "MDFileTag",
  0x82a6: "MDScalePixel",
  0x82a7: "MDColorTable",
  0x82a8: "MDLabName",
  0x82a9: "MDSampleInfo",
  0x82aa: "MDPrepDate",
  0x82ab: "MDPrepTime",
  0x82ac: "MDFileUnits",
  0x8335: "AdventScale",
  0x8336: "AdventRevision",
  0x835c: "UIC1Tag",
  0x835d: "UIC2Tag",
  0x835e: "UIC3Tag",
  0x835f: "UIC4Tag",
  0x847e: "IntergraphPacketData",
  0x847f: "IntergraphFlagRegisters",
  0x8481: "INGRReserved",
  0x84e0: "Site",
  0x84e1: "ColorSequence",
  0x84e2: "IT8Header",
  0x84e3: "RasterPadding",
  0x84e4: "BitsPerRunLength",
  0x84e5: "BitsPerExtendedRunLength",
  0x84e6: "ColorTable",
  0x84e7: "ImageColorIndicator",
  0x84e8: "BackgroundColorIndicator",
  0x84e9: "ImageColorValue",
  0x84ea: "BackgroundColorValue",
  0x84eb: "PixelIntensityRange",
  0x84ec: "TransparencyIndicator",
  0x84ed: "ColorCharacterization",
  0x84ee: "HCUsage",
  0x84ef: "TrapIndicator",
  0x84f0: "CMYKEquivalent",
  0x8568: "AFCP_IPTC",
  0x85b8: "PixelMagicJBIGOptions", // (no, -)
  0x85d7: "JPLCartoIFD", // (no, -)
  0x8602: "WB_GRGBLevels", // (no, -)
  0x8606: "LeafData",
  0x877f: "TIFF_FXExtensions", // (no, -)
  0x8780: "MultiProfiles", // (no, -)
  0x8781: "SharedData", // (no, -)
  0x8782: "T88Options", // (no, -)
  0x87ac: "ImageLayer", // (no, -)
  0x87be: "JBIGOptions", // (no, -)
  0x8828: "Opto-ElectricConvFactor", // (no, -)
  0x8829: "Interlace", // (no, -)
  0x885c: "FaxRecvParams", // (no, -)
  0x885d: "FaxSubAddress", // (no, -)
  0x885e: "FaxRecvTime", // (no, -)
  0x888a: "LeafSubIFD",
  0x920b: "FlashEnergy", // Duplicate (no, -)
  0x920c: "SpatialFrequencyResponse", // Duplicate (no, -)
  0x920d: "Noise", // Duplicate (no, -)
  0x920e: "FocalPlaneXResolution", // Duplicate (no, -)
  0x920f: "FocalPlaneYResolution", // Duplicate (no, -)
  0x9210: "FocalPlaneResolutionUnit", // Duplicate (no, -)
  0x9215: "ExposureIndex", // Duplicate (no, -)
  0x9216: "TIFF-EPStandardID", // Duplicate (no, -)
  0x9217: "SensingMethod", // Duplicate (no, -)
  0x923a: "CIP3DataFile", // (no, -)
  0x923b: "CIP3Sheet", // (no, -)
  0x923c: "CIP3Side", // (no, -)
  0x923f: "StoNits", // (no, -)
  0x932f: "MSDocumentText", // (no, -)
  0x9330: "MSPropertySetStorage", // (no, -)
  0x9331: "MSDocumentTextPosition", // (no, -)
  0xa005: "InteropOffset",
  0xa20c: "SpatialFrequencyResponse", // Duplicate (no, -)
  0xa20d: "Noise", // Duplicate (no, -)
  0xa211: "ImageNumber", // Duplicate (no, -)
  0xa212: "SecurityClassification", // Duplicate (no, -)
  0xa213: "ImageHistory", // Duplicate (no, -)
  0xa216: "TIFF-EPStandardID", // Duplicate (no, -)
  0xa40b: "DeviceSettingDescription",
  0xafc0: "ExpandSoftware",
  0xafc1: "ExpandLens",
  0xafc2: "ExpandFilm",
  0xafc3: "ExpandFilterLens",
  0xafc4: "ExpandScanner",
  0xafc5: "ExpandFlashLamp",
  0xbc01: "PixelFormat",
  0xbc02: "Transformation",
  0xbc03: "Uncompressed",
  0xbc04: "ImageType",
  0xbc80: "ImageWidth",
  0xbc81: "ImageHeight",
  0xbc82: "WidthResolution",
  0xbc83: "HeightResolution",
  0xbcc0: "ImageOffset",
  0xbcc1: "ImageByteCount",
  0xbcc2: "AlphaOffset",
  0xbcc3: "AlphaByteCount",
  0xbcc4: "ImageDataDiscard",
  0xbcc5: "AlphaDataDiscard",
  0xc427: "OceScanjobDesc",
  0xc428: "OceApplicationSelector",
  0xc429: "OceIDNumber",
  0xc42a: "OceImageLogic",
  0xc44f: "Annotations",
  0xc580: "USPTOOriginalContentType",
  0xc640: "RawImageSegmentation", // (no, -)
  0xc660: "AliasLayerMetadata", // (no, -)
  0xc71e: "SubTileBlockSize",
  0xc71f: "RowInterleaveFactor",
  0xfe00: "KDC_IFD",
};

export type SubIFDTag =
  | "SampleFormat"
  | "ThumbnailOffset"
  | "ThumbnailLength"
  | "VignettingCorrection" // Found in Sony ARW images
  | "VignettingCorrParams" // Found in Sony ARW images
  | "ChromaticAberrationCorrection" // Found in Sony ARW images
  | "ChromaticAberrationCorrParams" // Found in Sony ARW images
  | "DistortionCorrection" // Found in Sony ARW images
  | "DistortionCorrParams" // Found in Sony ARW images
  | "SonyCropTopLeft"
  | "SonyCropSize"
  | "CFARepeatPatternDim"
  | "CFAPattern2"
  | "CFAPlaneColor"
  | "CFALayout"
  | "LinearizationTable"
  | "BlackLevelRepeatDim"
  | "BlackLevel"
  | "BlackLevelDeltaH"
  | "BlackLevelDeltaV"
  | "WhiteLevel"
  | "DefaultScale"
  | "DefaultCropOrigin"
  | "DefaultCropSize"
  | "BayerGreenSplit"
  | "ChromaBlurRadius"
  | "AntiAliasStrength"
  | "BestQualityScale"
  | "ActiveArea"
  | "MaskedAreas"
  | "NoiseReductionApplied"
  | "OpcodeList1"
  | "OpcodeList2"
  | "OpcodeList3"
  | "NoiseProfile"
  | "DefaultUserCrop"
  | "ProfileGainTableMap"
  | "SemanticName"
  | "SemanticInstanceIFD"
  | "MaskSubArea";

export const SUB_IFD_NAME_BY_TAG_ID: Readonly<{ [tagName: number]: SubIFDTag }> = Object.freeze({
  0x0153: "SampleFormat",
  0x0201: "ThumbnailOffset",
  0x0202: "ThumbnailLength",
  0x7032: "VignettingCorrection",
  0x7034: "VignettingCorrParams",
  0x7035: "ChromaticAberrationCorrection",
  0x7036: "ChromaticAberrationCorrParams",
  0x7037: "DistortionCorrection",
  0x7031: "DistortionCorrParams",
  0x74c7: "SonyCropTopLeft",
  0x74c8: "SonyCropSize",
  0x828d: "CFARepeatPatternDim",
  0x828e: "CFAPattern2",
  0xc616: "CFAPlaneColor",
  0xc617: "CFALayout",
  0xc618: "LinearizationTable",
  0xc619: "BlackLevelRepeatDim",
  0xc61a: "BlackLevel",
  0xc61b: "BlackLevelDeltaH",
  0xc61c: "BlackLevelDeltaV",
  0xc61d: "WhiteLevel",
  0xc61e: "DefaultScale",
  0xc61f: "DefaultCropOrigin",
  0xc620: "DefaultCropSize",
  0xc62d: "BayerGreenSplit",
  0xc631: "ChromaBlurRadius",
  0xc632: "AntiAliasStrength",
  0xc65c: "BestQualityScale",
  0xc68d: "ActiveArea",
  0xc68e: "MaskedAreas",
  0xc6f7: "NoiseReductionApplied",
  0xc740: "OpcodeList1",
  0xc741: "OpcodeList2",
  0xc74e: "OpcodeList3",
  0xc761: "NoiseProfile",
  0xc7b5: "DefaultUserCrop",
  0xcd2d: "ProfileGainTableMap",
  0xcd2e: "SemanticName",
  0xcd30: "SemanticInstanceIFD",
  0xcd38: "MaskSubArea",
});
