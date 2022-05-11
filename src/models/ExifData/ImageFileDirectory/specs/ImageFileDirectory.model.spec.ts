import { ImageFileDirectory } from "../ImageFileDirectory.model";
import { DataViewStub } from "./DataViewStub";

describe("IFD 클래스의 동작을 테스트한다.", () => {
  it("문자열 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendStringEntry(0x010f, "Apple\0") // Make
      .appendStringEntry(0x0131, "iOS") // Software
      .appendStringEntry(0x0110, "iPhone 13 Pro"); // Model

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toBe("Apple");
    expect(imageFileDirectory.entries[1].payload).toBe("iOS");
    expect(imageFileDirectory.entries[2].payload).toBe("iPhone 13 Pro");
  });

  it("Signed Short 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendSignedShortEntry(0x0001, [10, 11, 12, 13, 14, 15])
      .appendSignedShortEntry(0x0002, [-10])
      .appendSignedShortEntry(0x0003, [-100, -110, -120, -130]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toEqual([10, 11, 12, 13, 14, 15]);
    expect(imageFileDirectory.entries[1].payload).toBe(-10);
    expect(imageFileDirectory.entries[2].payload).toEqual([-100, -110, -120, -130]);
  });

  it("Signed Long 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendSignedLongEntry(0x0001, [286331153, 286331151, 276331158, 246331153, 286331159])
      .appendSignedLongEntry(0x0002, [-321])
      .appendSignedLongEntry(0x0003, [-100000, -110000, -120000, -130000]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toEqual([286331153, 286331151, 276331158, 246331153, 286331159]);
    expect(imageFileDirectory.entries[1].payload).toBe(-321);
    expect(imageFileDirectory.entries[2].payload).toEqual([-100000, -110000, -120000, -130000]);
  });

  it("Signed Rational 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendSignedRationalEntry(0x0001, [[-299, 1000]])
      .appendSignedRationalEntry(0x0002, [[9212, 1000]])
      .appendSignedRationalEntry(0x0003, [[-982, 1000]]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toBe(-0.299);
    expect(imageFileDirectory.entries[1].payload).toBe(9.212);
    expect(imageFileDirectory.entries[2].payload).toBe(-0.982);
  });

  it("Unsigned Short 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendUnsignedShortEntry(0x0001, [1000, 1001, 1002, 1003, 1004])
      .appendUnsignedShortEntry(0x0002, [2000])
      .appendUnsignedShortEntry(0x0003, [3000, 3001, 3002, 3003]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toEqual([1000, 1001, 1002, 1003, 1004]);
    expect(imageFileDirectory.entries[1].payload).toBe(2000);
    expect(imageFileDirectory.entries[2].payload).toEqual([3000, 3001, 3002, 3003]);
  });

  it("Unsigned Long 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendUnsignedLongEntry(0x0001, [286331153, 286331151, 276331158, 246331153, 286331159])
      .appendUnsignedLongEntry(0x0002, [1000])
      .appendUnsignedLongEntry(0x0003, [100000, 110000, 120000, 130000]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toEqual([286331153, 286331151, 276331158, 246331153, 286331159]);
    expect(imageFileDirectory.entries[1].payload).toBe(1000);
    expect(imageFileDirectory.entries[2].payload).toEqual([100000, 110000, 120000, 130000]);
  });

  it("Unsigned Rational 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendUnsignedRationalEntry(0x0001, [[9128, 100]])
      .appendUnsignedRationalEntry(0x0002, [[91, 10000]])
      .appendUnsignedRationalEntry(0x0003, [[55850, 10]]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toBe(91.28);
    expect(imageFileDirectory.entries[1].payload).toBe(0.0091);
    expect(imageFileDirectory.entries[2].payload).toBe(5585);
  });

  it("Single Float 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(3, 100);

    dataViewStub
      .appendSingleFloatEntry(0x0001, [91.12, 87.18, -10.11, 12.97])
      .appendSingleFloatEntry(0x0002, [19.09])
      .appendSingleFloatEntry(0x0003, [1991.122, 87.185, 10.118, -12.197]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    // NOTE: 자바스크립트 상에서 실수 계산이 정확하지 않으므로, toFixed를 통해 대략적인 값만을 비교합니다.
    const simplifiedResult1 = (imageFileDirectory.entries[0].payload as number[]).map((value) => value.toFixed(2));
    const simplifiedResult2 = (imageFileDirectory.entries[1].payload as number).toFixed(2);
    const simplifiedResult3 = (imageFileDirectory.entries[2].payload as number[]).map((value) => value.toFixed(3));

    expect(simplifiedResult1).toEqual([91.12, 87.18, -10.11, 12.97].map((value) => value.toFixed(2)));
    expect(simplifiedResult2).toEqual("19.09");
    expect(simplifiedResult3).toEqual([1991.122, 87.185, 10.118, -12.197].map((value) => value.toFixed(3)));
  });

  it("Single Float 타입의 데이터를 가진 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(2, 100);

    dataViewStub.appendDoubleFloatEntry(0x0001, [91.12923, -11.18123]).appendDoubleFloatEntry(0x0002, [1991.12112, 87.14478]);

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    // NOTE: 자바스크립트 상에서 실수 계산이 정확하지 않으므로, toFixed를 통해 대략적인 값만을 비교합니다.
    const simplifiedResult1 = (imageFileDirectory.entries[0].payload as number[]).map((value) => value.toFixed(5));
    const simplifiedResult2 = (imageFileDirectory.entries[1].payload as number[]).map((value) => value.toFixed(5));

    expect(simplifiedResult1).toEqual([91.12923, -11.18123].map((value) => value.toFixed(5)));
    expect(simplifiedResult2).toEqual([1991.12112, 87.14478].map((value) => value.toFixed(5)));
  });
});
