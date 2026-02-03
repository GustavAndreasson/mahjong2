import React from "react";
import "./TransactionRow.scss";

const TransactionRow = ({ points, pause }) => (
    <div className="transaction-row">
        { points?.map((point, i) => (
            <div key={i} className={pause?.includes(i) ? "paused" : ""}>
                { point }
            </div>
        ))}
    </div>
)

export default TransactionRow;
