// tslint:disable-next-line: no-namespace
export namespace Entity {
    // We should move all our model with in this namespace and use their reference for Strongly-typed.
    export interface Vessel {
      label: {
        color: string;
        text: string;
      };
      name: string;
      position: {
        lat: number;
        lng: number;
      };
      options: {
        animation: any;
      };
      display: boolean;
    }
}