import React from "react";
import "./TransactionRow.scss";

interface TransactionRowProps {
    points: number[];
    pause: number[] | null;
}

const TransactionRow = ({ points, pause }: TransactionRowProps) => (
    <div className="transaction-row">
        { points?.map((point, i) => (
            <div key={i} className={pause?.includes(i) ? "paused" : ""}>
                { point }
            </div>
        ))}
    </div>
)

export default TransactionRow;
