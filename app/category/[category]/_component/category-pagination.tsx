import Link from "next/link";
import React from "react";

interface CategoryPaginationProps {
  curPage: number;
  lastPage: number;
}

const CategoryPagination = ({ curPage, lastPage }: CategoryPaginationProps) => {
  return (
    <nav>
      <ul className="flex items-center justify-center space-x-4">
        <li>
          <Link
            href={{
              query: {
                page: curPage === 1 ? 1 : curPage - 1,
              },
            }}
          >
            {`<`}
          </Link>
        </li>
        {Array.from({ length: 4 }).map((_, idx) => (
          <PaginationLink key={idx} curPage={curPage} target={idx + 1} />
        ))}
        <li>
          <Link
            href={{
              query: {
                page: curPage === lastPage ? lastPage : curPage + 1,
              },
            }}
          >
            {`>`}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

interface PaginationLink {
  curPage: number;
  target: number;
}

const PaginationLink = ({ curPage, target }: PaginationLink) => {
  return (
    <li>
      <Link
        href={{
          query: {
            page: target,
          },
        }}
        className={`${curPage === target && "underline underline-offset-2"}`}
      >
        {target}
      </Link>
    </li>
  );
};

export default CategoryPagination;
