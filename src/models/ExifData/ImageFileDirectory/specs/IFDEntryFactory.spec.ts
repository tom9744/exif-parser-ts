import { IFDEntryFactory } from "../IFDEntryFactory";
import { DataViewStub } from "./DataViewStub";

describe("IFDEntryFactory의 동작을 테스트한다.", () => {
  let factory: IFDEntryFactory;

  beforeEach(() => {
    factory = new IFDEntryFactory(true);
  });

  describe("예외 케이스에 대한 동작을 테스트한다.", () => {
    it("유효하지 않은 포맷을 감지한 경우, TypeError를 발생시킨다.", () => {
      const dataView = new DataView(new ArrayBuffer(12));
      dataView.setInt16(0, 0x01, true);
      dataView.setInt16(2, 0x9c, true); // 유효하지 않은 포맷
      dataView.setInt32(4, 0x01, true);
      dataView.setInt32(8, 0x01, true);

      const functionCall = () => factory.createEntry({ dataView, entryOffset: 0 });

      expect(functionCall).toThrow(TypeError);
    });
  });

  describe("IFDEntry 인스턴스 생성 과정을 테스트한다.", () => {
    it("String 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 50, true).appendStringEntry(0x11, "Lorem Ipsum");

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toBe("Lorem Ipsum");
    });

    it("Signed Short 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 50, true).appendSignedShortEntry(0x12, [1, -2, 3, -4, 5]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toEqual([1, -2, 3, -4, 5]);
    });

    it("Unsigned Short 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 50, true).appendSignedShortEntry(0x13, [1, 2, 3, 4, 5]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toEqual([1, 2, 3, 4, 5]);
    });

    it("Signed Long 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 50, true).appendSignedLongEntry(0x14, [1, -2, 3, -4, 5]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toEqual([1, -2, 3, -4, 5]);
    });

    it("Unsigned Long 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 50, true).appendUnsignedLongEntry(0x15, [1, 2, 3, 4, 5]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toEqual([1, 2, 3, 4, 5]);
    });

    it("Signed Rational 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 100, true).appendSignedRationalEntry(0x16, [
        [1, 10],
        [-2, 10],
        [3, 10],
        [-4, 10],
        [5, 10],
      ]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toEqual([0.1, -0.2, 0.3, -0.4, 0.5]);
    });

    it("Unsigned Rational 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 100, true).appendUnsignedRationalEntry(0x17, [
        [1, 10],
        [2, 10],
        [3, 10],
        [4, 10],
        [5, 10],
      ]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toEqual([0.1, 0.2, 0.3, 0.4, 0.5]);
    });

    it("Single Float 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 100, true).appendSingleFloatEntry(0x18, [0.1, -0.2, 0.3, -0.4, 0.5]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      const dataToFixed2 = (data as number[]).map((value) => value.toFixed(1));

      expect(dataToFixed2).toEqual<string[]>(["0.1", "-0.2", "0.3", "-0.4", "0.5"]);
    });

    it("Double Float 타입의 데이터를 포함하는 IFDEntry 인스턴스를 생성한다.", () => {
      const { dataView } = new DataViewStub(1, 100, true).appendDoubleFloatEntry(0x19, [0.001, -0.002, 0.003, -0.004, 0.005]);

      const { data } = factory.createEntry({ dataView, entryOffset: 12 });

      expect(data).toEqual([0.001, -0.002, 0.003, -0.004, 0.005]);
    });
  });
});
