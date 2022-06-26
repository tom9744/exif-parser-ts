# exif-parser-ts

## 개요

타입스크립트로 작성된 JPEG 포맷 이미지에 포함되어 있는 EXIF 메타데이터(GPS 좌표 등...)를 추출하는 브라우저 환경 전용 라이브러리입니다.

## 설치

```shell
npm run install exif-parser-ts
```

## 사용법

본 라이브러리의 유일한 공개 함수 `extractExifTags`를 호출해야 합니다. 함수 호출 시, `<input>` 태그 등을 통해 전달받은 `File` 타입의 데이터를 인자로 전달합니다.

`extractExifTags`는 비동기 함수이며, 아래의 두 방법으로 호출할 수 있습니다.

### `Promise`를 사용하는 방법

```typescript
extractExifTags(file)
  .then((metadata) => {})
  .catch((error) => {});
```

### `async/await` 구문을 사용하는 방법

```typescript
import { extractExifTags } from "exif-parser-ts";

async function foo() {
  const metadata = await extractExifTags(file);
}
```
