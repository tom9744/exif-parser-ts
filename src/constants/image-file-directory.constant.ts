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
  0x000b: "ProcessingSoftware",
  0x00fe: "SubfileType",
  0x00ff: "OldSubfileType",
  0x0100: "ImageWidth",
  0x0101: "ImageHeight",
  0x0102: "BitsPerSample",
  0x0103: "Compression",
  0x0106: "PhotometricInterpretation",
  0x0107: "Thresholding",
  0x0108: "CellWidth",
  0x0109: "CellLength",
  0x010a: "FillOrder",
  0x010d: "DocumentName",
  0x010e: "ImageDescription",
  0x010f: "Make",
  0x0110: "Model",
  0x0111: "StripOffsets",
  0x0112: "Orientation",
  0x0115: "SamplesPerPixel",
  0x0116: "RowsPerStrip",
  0x0117: "StripByteCounts",
  0x0118: "MinSampleValue",
  0x0119: "MaxSampleValue",
  0x011a: "XResolution",
  0x011b: "YResolution",
  0x011c: "PlanarConfiguration",
  0x011d: "PageName",
  0x011e: "XPosition",
  0x011f: "YPosition",
  0x0120: "FreeOffsets",
  0x0121: "FreeByteCounts",
  0x0122: "GrayResponseUnit",
  0x0123: "GrayResponseCurve",
  0x0124: "T4Options",
  0x0125: "T6Options",
  0x0128: "ResolutionUnit",
  0x0129: "PageNumber",
  0x012c: "ColorResponseUnit",
  0x012d: "TransferFunction",
  0x0131: "Software",
  0x0132: "ModifyDate",
  0x013b: "Artist",
  0x013c: "HostComputer",
  0x013d: "Predictor",
  0x013e: "WhitePoint",
  0x013f: "PrimaryChromaticities",
  0x0140: "ColorMap",
  0x0141: "HalftoneHints",
  0x0142: "TileWidth",
  0x0143: "TileLength",
  0x0144: "TileOffsets",
  0x0145: "TileByteCounts",
  0x0146: "BadFaxLines",
  0x0147: "CleanFaxData",
  0x0148: "ConsecutiveBadFaxLines",
  0x014a: "SubIFD",
  0x014c: "InkSet",
  0x014d: "InkNames",
  0x014e: "NumberofInks",
  0x0150: "DotRange",
  0x0151: "TargetPrinter",
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
  0x0211: "YCbCrCoefficients",
  0x0212: "YCbCrSubSampling",
  0x0213: "YCbCrPositioning",
  0x0214: "ReferenceBlackWhite",
  0x022f: "StripRowCounts",
  0x02bc: "ApplicationNotes",
  0x03e7: "USPTOMiscellaneous",
  0x1000: "RelatedImageFileFormat",
  0x1001: "RelatedImageWidth",
  0x1002: "RelatedImageHeight",
  0x4746: "Rating",
  0x4747: "XP_DIP_XML",
  0x4748: "StitchInfo",
  0x4749: "RatingPercent",
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
  0x8298: "Copyright",
  0x82a5: "MDFileTag",
  0x82a6: "MDScalePixel",
  0x82a7: "MDColorTable",
  0x82a8: "MDLabName",
  0x82a9: "MDSampleInfo",
  0x82aa: "MDPrepDate",
  0x82ab: "MDPrepTime",
  0x82ac: "MDFileUnits",
  0x830e: "PixelScale",
  0x8335: "AdventScale",
  0x8336: "AdventRevision",
  0x835c: "UIC1Tag",
  0x835d: "UIC2Tag",
  0x835e: "UIC3Tag",
  0x835f: "UIC4Tag",
  0x83bb: "IPTC-NAA",
  0x847e: "IntergraphPacketData",
  0x847f: "IntergraphFlagRegisters",
  0x8480: "IntergraphMatrix",
  0x8481: "INGRReserved",
  0x8482: "ModelTiePoint",
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
  0x8546: "SEMInfo",
  0x8568: "AFCP_IPTC",
  0x85b8: "PixelMagicJBIGOptions", // (no, -)
  0x85d7: "JPLCartoIFD", // (no, -)
  0x85d8: "ModelTransform",
  0x8602: "WB_GRGBLevels", // (no, -)
  0x8606: "LeafData",
  0x8649: "PhotoshopSettings",
  0x8769: "ExifOffset",
  0x8773: "ICC_Profile",
  0x877f: "TIFF_FXExtensions", // (no, -)
  0x8780: "MultiProfiles", // (no, -)
  0x8781: "SharedData", // (no, -)
  0x8782: "T88Options", // (no, -)
  0x87ac: "ImageLayer", // (no, -)
  0x87af: "GeoTiffDirectory",
  0x87b0: "GeoTiffDoubleParams",
  0x87b1: "GeoTiffAsciiParams",
  0x87be: "JBIGOptions", // (no, -)
  0x8825: "GPSInfo",
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
  0x935c: "ImageSourceData",
  0x9c9b: "XPTitle",
  0x9c9c: "XPComment",
  0x9c9d: "XPAuthor",
  0x9c9e: "XPKeywords",
  0x9c9f: "XPSubject",
  0xa005: "InteropOffset",
  0xa20c: "SpatialFrequencyResponse", // Duplicate (no, -)
  0xa20d: "Noise", // Duplicate (no, -)
  0xa211: "ImageNumber", // Duplicate (no, -)
  0xa212: "SecurityClassification", // Duplicate (no, -)
  0xa213: "ImageHistory", // Duplicate (no, -)
  0xa216: "TIFF-EPStandardID", // Duplicate (no, -)
  0xa40b: "DeviceSettingDescription",
  0xa480: "GDALMetadata",
  0xa481: "GDALNoData",
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
  0xc4a5: "PrintIM",
  0xc580: "USPTOOriginalContentType",
  0xc612: "DNGVersion",
  0xc613: "DNGBackwardVersion",
  0xc614: "UniqueCameraModel",
  0xc615: "LocalizedCameraModel",
  0xc621: "ColorMatrix1",
  0xc622: "ColorMatrix2",
  0xc623: "CameraCalibration1",
  0xc624: "CameraCalibration2",
  0xc625: "ReductionMatrix1",
  0xc626: "ReductionMatrix2",
  0xc627: "AnalogBalance",
  0xc628: "AsShotNeutral",
  0xc629: "AsShotWhiteXY",
  0xc62a: "BaselineExposure",
  0xc62b: "BaselineNoise",
  0xc62c: "BaselineSharpness",
  0xc62e: "LinearResponseLimit",
  0xc62f: "CameraSerialNumber",
  0xc630: "DNGLensInfo",
  0xc633: "ShadowScale",
  0xc634: "DNGPrivateData",
  0xc635: "MakerNoteSafety",
  0xc640: "RawImageSegmentation",
  0xc65a: "CalibrationIlluminant1",
  0xc65b: "CalibrationIlluminant2",
  0xc65d: "RawDataUniqueID",
  0xc660: "AliasLayerMetadata",
  0xc68b: "OriginalRawFileName",
  0xc68c: "OriginalRawFileData",
  0xc68f: "AsShotICCProfile",
  0xc690: "AsShotPreProfileMatrix",
  0xc691: "CurrentICCProfile",
  0xc692: "CurrentPreProfileMatrix",
  0xc6bf: "ColorimetricReference",
  0xc6d2: "PanasonicTitle",
  0xc6d3: "PanasonicTitle2",
  0xc6f3: "CameraCalibrationSig",
  0xc6f4: "ProfileCalibrationSig",
  0xc6f5: "ProfileIFD",
  0xc6f6: "AsShotProfileName",
  0xc6f8: "ProfileName",
  0xc6f9: "ProfileHueSatMapDims",
  0xc6fa: "ProfileHueSatMapData1",
  0xc6fb: "ProfileHueSatMapData2",
  0xc6fc: "ProfileToneCurve",
  0xc6fd: "ProfileEmbedPolicy",
  0xc6fe: "ProfileCopyright",
  0xc714: "ForwardMatrix1",
  0xc715: "ForwardMatrix2",
  0xc716: "PreviewApplicationName",
  0xc717: "PreviewApplicationVersion",
  0xc718: "PreviewSettingsName",
  0xc719: "PreviewSettingsDigest",
  0xc71a: "PreviewColorSpace",
  0xc71b: "PreviewDateTime",
  0xc71c: "RawImageDigest",
  0xc71d: "OriginalRawFileDigest",
  0xc71e: "SubTileBlockSize",
  0xc71f: "RowInterleaveFactor",
  0xc725: "ProfileLookTableDims",
  0xc726: "ProfileLookTableData",
  0xc763: "TimeCodes",
  0xc764: "FrameRate",
  0xc772: "TStop",
  0xc789: "ReelName",
  0xc791: "OriginalDefaultFinalSize",
  0xc792: "OriginalBestQualitySize",
  0xc793: "OriginalDefaultCropSize",
  0xc7a1: "CameraLabel",
  0xc7a3: "ProfileHueSatMapEncoding",
  0xc7a4: "ProfileLookTableEncoding",
  0xc7a5: "BaselineExposureOffset",
  0xc7a6: "DefaultBlackRender",
  0xc7a7: "NewRawImageDigest",
  0xc7a8: "RawToPreviewGain",
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
