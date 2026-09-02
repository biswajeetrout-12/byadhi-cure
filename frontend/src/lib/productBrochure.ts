import type { Product } from "@/types/product";

function pdfText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrap(value: string, width = 86) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function createProductBrochure(product: Product) {
  const lines = [
    product.name,
    `Category: ${product.category}`,
    "",
    ...wrap(product.description),
    "",
    "Composition",
    ...product.composition.flatMap((item) => wrap(`- ${item}`, 86)),
    "",
    "Uses and applications",
    ...product.uses.flatMap((item) => wrap(`- ${item}`, 86)),
    "",
    "Benefits",
    ...product.benefits.flatMap((item) => wrap(`- ${item}`, 86)),
    "",
    `Dosage: ${product.dosage}`,
    `Packaging: ${product.packaging}`,
    `Storage: ${product.storage}`,
    `Manufacturing: ${product.manufacturing}`,
  ];

  const commands = ["BT", "/F1 18 Tf", "50 760 Td", `(${pdfText(lines[0] || product.name)}) Tj`, "/F1 10 Tf"];
  lines.slice(1).forEach((line) => {
    commands.push("0 -16 Td", `(${pdfText(line)}) Tj`);
  });
  commands.push("ET");
  const stream = commands.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

