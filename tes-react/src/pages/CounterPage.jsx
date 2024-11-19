import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CounterPage = () => {
  const [countInput, setCountInput] = useState(0);

  const counterSelector = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch({ type: "INCREMENT_COUNT" });
  };
  const decrementCounter = () => {
    dispatch({ type: "DECREMENT_COUNT" });
  };
  const setCounterInput = () => {
    dispatch({ type: "INPUT_COUNT", payload: { newCount: countInput } });
  };

  return (
    <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 flex flex-col gap-4 justify-center items-center">
      <p className="font-semibold text-3xl">Count : {counterSelector.count}</p>

      <div className="flex items-center gap-4">
        <Button size="icon">
          <Minus onClick={decrementCounter} className="h-6 w-6" />
        </Button>

        <Button size="icon">
          <Plus onClick={incrementCounter} className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex gap-2 mt-4 items-center">
        <Input type="number" onChange={(e) => setCountInput(e.target.value)} />
        <Button onClick={setCounterInput}>Submit</Button>
      </div>
    </main>
  );
};
