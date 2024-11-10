/*eslint-disable */

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
}

interface DaumPostcode {
  embed(container: HTMLElement | string, options?: any): void;
  open(options?: any): void;
}

interface DaumPostcodeInstance {
  new (options: { oncomplete(data: DaumPostcodeData): void }): DaumPostcode;
}

declare global {
  interface Window {
    daum: {
      Postcode: DaumPostcodeInstance;
    };
  }
}
