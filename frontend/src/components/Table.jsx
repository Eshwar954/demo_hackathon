import { StatusBadge } from './Widgets';

const Table = ({ headers, data }) => {
  return (
    <div className="w-full overflow-x-auto bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm shadow-primary/5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant/50">
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/30">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
              {Object.entries(row).map(([key, val], cellIdx) => (
                <td key={cellIdx} className="px-6 py-4 font-body text-sm text-on-surface">
                  {key === 'status' ? <StatusBadge status={val} /> : val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
         <div className="p-8 text-center text-on-surface-variant font-body">No records found.</div>
      )}
    </div>
  );
};

export default Table;
