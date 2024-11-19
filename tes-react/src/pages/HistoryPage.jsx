import { SignedInPage } from "@/components/guard/SignedInPage";
import { HistoryItem } from "@/components/HistoryItem";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const userSelector = useSelector((state) => state.user);

  const fetchTransactionHistory = async () => {
    try {
      const historyResponse = await axiosInstance.get("/transactions", {
        params: {
          userId: userSelector.id,
        },
      });

      //historyresponse berisi invoice product yang dibeli user
      setTransactions(historyResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <SignedInPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">Order History</h1>

        <div className="flex flex-col mt-8 gap-20">
          {transactions.map((transaksi) => (
            <HistoryItem
              key={transaksi.id}
              id={transaksi.id}
              itemPrice={transaksi.itemPrice}
              tax={transaksi.tax}
              transactionDate={format(
                new Date(transaksi.transactionDate),
                "dd MMM yyyy "
              )}
              items={transaksi.items}
            />
          ))}
        </div>
      </main>
    </SignedInPage>
  );
};
