export function printLabel(url: string) {
  const printWindow = window.open(url, "_blank", "width=800,height=600");
  if (printWindow) {
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
    };
  } else {
    alert("Error trying print, please try again");
  }
}
