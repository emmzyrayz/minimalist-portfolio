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
      allowTaint?: boolean;
      logging?: boolean;
      scrollX?: number;
      scrollY?: number;
      backgroundColor?: string;
      width?: number;
      height?: number;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: string;
    };
  }

  export interface Html2PdfInstance {
    from(element: HTMLElement | null): Html2PdfInstance;
    set(options: Options): Html2PdfInstance;
    save(): void;
  }

  function html2pdf(): Html2PdfInstance;

  export default html2pdf;
}
