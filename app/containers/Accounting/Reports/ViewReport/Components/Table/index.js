import React from 'react';
import './style.css';

const Table = React.forwardRef(
  ({ data, TableHeadData, TableFooterData = '' }, ref) => (
    <div style={{ overflowX: 'auto' }}>
      {' '}
      <table ref={ref} className="table">
        <thead>
          <tr>
            {TableHeadData.map((row, index) => (
              <td key={index}>{row}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((eachRow, index) => (
              <tr key={index}>
                {Object.keys(eachRow).map(key => (
                  <td>{eachRow[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
        {TableFooterData && (
          <tfoot>
            <tr>
              {Object.values(TableFooterData[0]).map(key => (
                <td>{key}</td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  ),
);

export default Table;
