import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/admin/components/ui/avatar";
import { timeSince } from "@/app/admin/lib/utils";
import { SalesData } from "@/app/admin/types/index";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/admin/components/ui/table";
import { ScrollArea } from "@/app/admin/components/ui/scroll-area";

export function RecentSales({ data }: { data: SalesData[] }) {
  return (
    <>
      <Table className="md:block hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Profit</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {data.map((sale, i) => (
            <TableRow key={sale.customerId}>
              <TableCell className="font-medium">
                {sale.customer.firstName + " " + sale.customer.lastName}
              </TableCell>
              <TableCell>{sale.email}</TableCell>
              <TableCell>{timeSince(Date.parse(sale.createdAt))}</TableCell>
              <TableCell className="text-right">${sale.revenue}</TableCell>
              <TableCell className="text-right">${sale.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="space-y-8 md:hidden">
        {data.map((sale, i) => (
          <div key={i} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/avatars/0${i + 1}.png`} alt="Avatar" />
              <AvatarFallback>
                {sale.customer.firstName[0] + sale.customer.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {sale.customer.firstName + " " + sale.customer.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{sale.email}</p>
            </div>
            <div className="ml-auto font-medium">${sale.revenue}</div>
          </div>
        ))}
      </div>
    </>
  );
}
