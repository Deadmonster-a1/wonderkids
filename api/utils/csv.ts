export function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';

  const headers = Object.keys(rows[0]);
  const escapeCell = (value: unknown): string => {
    let str = value === null || value === undefined ? '' : String(value);
    // Neutralize formula injection: spreadsheet apps treat leading =+-@/tab/CR as a formula trigger.
    if (/^[=+\-@\t\r]/.test(str)) {
      str = `'${str}`;
    }
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const lines = [
    headers.join(','),
    ...rows.map((row) => headers.map((h) => escapeCell(row[h])).join(',')),
  ];

  return lines.join('\r\n');
}
