// helper para formatear fechas a YYYY-MM-DD
export function formatDate(dateString: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function formatCurrency(value: number | string) {
  if (value === null || value === undefined || value === "") return "-";
  // intenta parsear si viene como string con decimales
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  // formato sin símbolo (puedes cambiar a 'es-CO' y currency si quieres)
  return num.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}