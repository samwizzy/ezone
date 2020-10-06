import React from 'react';
import './style.css';

const Table = React.forwardRef(
  ({ data, TableHeadData, TableFooterData = '' }, ref) => (
    <div style={{ overflowX: 'auto' }}>
      <table ref={ref} className="table my-table">
        <thead>
          <tr>
            {TableHeadData.map((row, index) => (
              <td className="my-table" key={`${index}_${row}`}>
                {row}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((eachRow, index) => (
                <tr key={index}>
                  {Object.keys(eachRow).map((row, index) => (
                    <td className="my-table" key={`${index}_${eachRow[row]}`}>
                      {eachRow[row]}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
        {TableFooterData ? (
          <tfoot>
            <tr>
              {Object.values(TableFooterData[0]).map((row, index) => (
                <td className="my-table" key={`${index}_${row} unique`}>
                  {row}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  ),
);

export default Table;
