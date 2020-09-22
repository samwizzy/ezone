import React, { useRef, useState } from 'react';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';
import './style.css';

const FinPosition = () => {
  const componentRef = useRef();
  const [print, setPrint] = useState(false);
  return (
    <React.Fragment>
      <TopMenu componentRef={componentRef} print={print} setPrint={setPrint} />
      <div ref={componentRef}>
        <Company
          Logo={Logo}
          name="Statement of Financial Position"
          date="16th december, 2010"
        />

        <div className="finWrap">
          <div className="head-one bd  df">
            <span>Account</span> <span>Total ( NGN )</span>
          </div>
          <div className="body-one">
            <div className="body-one-header pd">
              <span>ASSETS</span>
            </div>
            <div>
              <div>
                <span className=" df pd space bold">NON CURRENT ASSETS</span>
              </div>
              <div className=" df pd">
                <span>Cash and cash equivalent</span>
                <span>2,000.00</span>
              </div>
              <div className="df pd">
                <span>Capital Work in Progress</span>
                <span>500.00</span>
              </div>
              <div className="dfe  result pd">
                <span>2,500.00</span>
              </div>
            </div>
            <div>
              <div className="pd space bold">
                <span>NON CURRENT ASSETS</span>
              </div>
              <div className="df pd">
                <span>Inventories</span>
                <span>940.00</span>
              </div>
              <div className="df pd">
                <span>Trade & Other receivables</span>
                <span>840.00</span>
              </div>
              <div className="df pd">
                <span>Cash and cash equivalent</span>
                <span>90.00</span>
              </div>
              <div className="dfe result pd">
                <span>1,870.00</span>
              </div>
              <div className="body-one-header bold total-pd df ">
                <span>TOTAL ASSET</span> <span>4,370.00</span>
              </div>
            </div>
          </div>
          <div className="body-two">
            <div className="body-one-header pd df bold">
              <span>EQUITY AND LIABILITIES</span>
            </div>
            <div className="pd  space bold">
              <span>CAPITAL AND RESERVES</span>
            </div>
            <div className="df pd">
              <span>Share Capital</span>
              <span>1500.00</span>
            </div>
            <div className="df pd">
              <span>Revaluation Reserves</span>
              <span>.</span>
            </div>
            <div className="df pd">
              <span>Retained earnings</span>
              <span>500.00</span>
            </div>
            <div className="dfe result pd">
              <span>2,500.00</span>
            </div>
            <div className="space-middle" />
            <div className="pd bold space">
              <span>NON-CURRENT LIABILITIES</span>
            </div>
            <div className="df pd">
              <span>Long Term Borrowings</span>
              <span>2,000.00</span>
            </div>
            <div className="df pd">
              <span>Deposit for Shares</span>
              <span>500.00</span>
            </div>
            <div className="dfe result  pd">
              <span>1,870.00</span>
            </div>
            <div className="pd space bold">
              <span>CURRENT LIABILITIES</span>
            </div>
            <div className="df pd">
              <span>Trade and other payables</span>
              <span>940.00</span>
            </div>
            <div className="df pd">
              <span>Short-term Loan</span>
              <span>840.00</span>
            </div>
            <div className="df pd">
              <span>Current Tax Payables</span>
              <span>90.00</span>
            </div>
            <div className="dfe  result pd">
              <span>1,870.00</span>
            </div>
            <div className="body-one-header total-pd df bold">
              <span>TOTAL EQUITY AND LIABILITIES</span> <span>4,370.00</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FinPosition;
