import { useReactToPrint } from "react-to-print";

/**
 * Wrapper hook around useReactToPrint
 */
export default function usePrint(ref: React.MutableRefObject<null>) {
  return useReactToPrint({
    documentTitle: 'resume.pdf',
    content: () => ref.current,
    print: async (printWindow: HTMLIFrameElement) => {
      const printContent = printWindow.contentDocument || printWindow.contentWindow?.document;

      const a4 = printContent?.querySelector('.a4') as HTMLElement;
      a4.style.transform = 'scale(1)';

      printWindow.contentWindow?.print();
    }
  });
}