export default function Table({
  columns,
  data,
  emptyMessage = "No data found",
  getRowKey = (row) => row._id,
  tableLayout = "auto",
  border = "1px solid #e5e7eb",
}) {
  const cellStyle = {
    padding: "14px 16px",
    fontSize: "13px",
    color: "#374151",
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
  };

  const headerStyle = {
    padding: "14px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout,
          border,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#ffffff" }}>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  ...headerStyle,
                  ...column.headerStyle,
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={getRowKey(row)}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "#f9fafb" : "#ffffff",
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      ...cellStyle,
                      ...column.cellStyle,
                    }}
                  >
                    {column.render
                      ? column.render(row, index)
                      : row[column.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  ...cellStyle,
                  padding: "30px",
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}