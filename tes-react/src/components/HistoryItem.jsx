import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

export const HistoryItem = (props) => {
  return (
    <div>
      <div className="rounded-md p-4 bg-slate-50 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground text-sm">
            {props.transactionDate}
          </span>
          <span className="text-muted-foreground font-semibold">
            INV-{props.id}
          </span>
        </div>

        <div className="flex flex-col justify-end items-end">
          <span className="text-2xl font-bold">
            Rp {(props.itemPrice + props.tax).toLocaleString("id-ID")}
          </span>

          <Link to={"/history/" + props.id}>
            <Button variant="link">View details</Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.items.map((cartItem) => {
            return (
              <TableRow className="text-muted-foreground font-semibold">
                <TableCell colSpan={2}>
                  <div className="flex items-center gap-6">
                    <div className="aspect-square w-[100px] overflow-hidden rounded-md">
                      <img
                        src={cartItem.product.gambar}
                        alt={cartItem.product.nama}
                      />
                    </div>
                    <p className="font-semibold text-primary">
                      {cartItem.product.nama}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  Rp{cartItem.product.harga.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{cartItem.count}</TableCell>
                <TableCell>
                  Rp
                  {(cartItem.product.harga * cartItem.count).toLocaleString(
                    "id-ID"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
