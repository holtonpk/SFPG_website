import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/admin/components/ui/avatar";
import { SalesData } from "@/app/admin/types/index";
export function RecentSales({ data }: { data: SalesData[] }) {
  return (
    <div className="space-y-8 ">
      {data
        .reverse()
        .slice(0, 5)
        .map((sale, i) => (
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
  );
}
