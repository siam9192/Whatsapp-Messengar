import React from "react";
import {
  Pagination as ShadePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  total: number;
  limit: number;
  current: number;
  onChange?: (page:number) => void | any;
}

function Pagination({ total, limit, current, onChange }: Props) {
  return (
    <ShadePagination >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        {Array.from({ length: Math.floor(total / limit) }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink isActive={index + 1 === current}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </ShadePagination>
  );
}

export default Pagination;
