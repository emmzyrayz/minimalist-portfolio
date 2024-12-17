// types/html2pdf.js.d.ts
declare module "html2pdf.js" {
  export interface Options {
    margin?: number | number[];
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      logging?: boolean;
      scrollX?: number;
      scrollY?: number;
      backgroundColor?: string;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: string;
    };
  }

  function html2pdf(): {
    from(element: HTMLElement): {
      set(options: Options): {
        save(): Promise<void>;
      };
    };
  };

  export default html2pdf;
}
