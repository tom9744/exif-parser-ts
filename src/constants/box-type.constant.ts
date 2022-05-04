/**
 * According to ISO/IEC 14496.
 *
 * Link: https://sce.umkc.edu/faculty-sites/lizhu/teaching/2021.spring.video/ref/mp4.pdf
 */
export enum MetaChildBoxType {
  HandlerBox = "hdlr",
  PrimaryItemBox = "pitm",
  DataInformationBox = "dinf",
  ItemLocationBox = "iloc",
  ItemProtectionBox = "ipro",
  ItemInfoBox = "iinf",
  ItemInfoEntry = "infe",
  IPMPControBox = "ipmc",
}
