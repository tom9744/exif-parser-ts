import { ImageFileDirectory } from "../ImageFileDirectory.model";
import { DataViewStub } from "./DataViewStub";

describe("IFD 클래스의 동작을 테스트한다.", () => {
  it("문자열 IFD Entry로 구성된 Image File Directory의 데이터를 읽는다.", () => {
    const dataViewStub = new DataViewStub(2, 50);

    dataViewStub
      .appendStringEntry(0x010f, "Apple\0") // Make
      .appendStringEntry(0x0110, "iPhone 13 Pro"); // Model

    const imageFileDirectory = new ImageFileDirectory(dataViewStub.dataView, 0, false);

    expect(imageFileDirectory.entries[0].payload).toBe("Apple");
    expect(imageFileDirectory.entries[1].payload).toBe("iPhone 13 Pro");
  });
});
