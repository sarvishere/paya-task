"use client";

import React from "react";
import { Spin, Typography, Avatar, Empty } from "antd";
import { cn } from "@/utils/cn";
import { SearchResultsProps } from "./type";

const { Text } = Typography;

function SearchResults<T = unknown>({
  show,
  searchTerm,
  isLoading,
  error,
  results,
  totalResults,
  maxResults,
  onResultClick,
  onShowAll,
  renderItem,
  getItemKey,
  className,
  emptyText = "نتیجه‌ای یافت نشد",
  loadingText = "در حال جستجو...",
  errorText = "خطا در جستجو",
  showHeader = true,
  showCount = true,
  maxHeight = 400,
}: SearchResultsProps<T>) {

  if (!show) return null;

  const containerClasses = cn(
    "absolute top-full left-0 right-0 mt-2 z-[9999]",
    "bg-white rounded-xl",
    "shadow-lg border border-gray-200",
    "animate-[slideDown_0.2s_ease]",
    className,
  );

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <div className="flex items-center justify-center gap-3 py-6 text-gray-500">
          <Spin size="small" />
          <span>{loadingText}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(containerClasses, "border-error/30")}>
        <div className="py-4 px-6 text-center text-error bg-error/5 rounded-xl">
          ⚠️ {errorText}: {error}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={containerClasses}>
        <div className="py-8 px-6 text-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-400">
                {emptyText}
                {searchTerm && (
                  <>
                    {" "}
                    برای "
                    <span className="font-medium text-gray-600">
                      {searchTerm}
                    </span>
                    "
                  </>
                )}
              </span>
            }
          />
        </div>
      </div>
    );
  }

  const displayResults = results.slice(0, maxResults);
  const hasMore = totalResults > maxResults;

  return (
    <div
      className={cn(
        containerClasses,
        "overflow-y-auto",
        "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
      )}
      style={{ maxHeight }}
    >
      {showHeader && (
        <div
          className={cn(
            "sticky top-0 z-10 px-4 py-2.5",
            "bg-gray-50/95 backdrop-blur-sm",
            "border-b border-gray-200",
            "rounded-t-xl",
          )}
        >
          {showCount && (
            <Text type="secondary" className="text-xs text-gray-500">
              {totalResults} نتیجه
              {searchTerm && (
                <>
                  {" "}
                  برای "
                  <span className="font-medium text-gray-700">
                    {searchTerm}
                  </span>
                  "
                </>
              )}
            </Text>
          )}
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {displayResults.map((item: T, index: number) => (
          <div
            key={getItemKey ? getItemKey(item, index) : index}
            onClick={() => onResultClick(item)}
            className={cn(
              "px-4 py-3",
              "hover:bg-primary/5",
              "cursor-pointer transition-all duration-150",
              "hover:translate-x-1 active:scale-[0.99]",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
            )}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onResultClick(item);
              }
            }}
          >
            {renderItem ? (
              renderItem(item, index)
            ) : (
              <div className="flex items-center gap-3">
                {(item as any).thumbnail && (
                  <Avatar
                    src={(item as any).thumbnail}
                    shape="square"
                    size={44}
                    className="rounded-lg shrink-0 border border-gray-200"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate">
                    {(item as any).title ||
                      (item as any).name ||
                      (item as any).label ||
                      "بدون عنوان"}
                  </div>

                  {(item as any).description && (
                    <div className="text-sm text-gray-500 truncate">
                      {(item as any).description}
                    </div>
                  )}

                  {(item as any).tags && Array.isArray((item as any).tags) && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {(item as any).tags.slice(0, 3).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {(item as any).price !== undefined && (
                  <div className="text-primary font-bold text-sm shrink-0">
                    ${(item as any).price}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {hasMore && onShowAll && (
        <div
          className={cn(
            "px-4 py-3 text-center",
            "border-t border-gray-200",
            "cursor-pointer hover:bg-primary/5",
            "transition-colors duration-150 rounded-b-xl",
            "font-medium text-primary",
            "hover:shadow-inner",
          )}
          onClick={onShowAll}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onShowAll();
            }
          }}
        >
          مشاهده همه {totalResults} نتیجه
        </div>
      )}
    </div>
  );
}

export default React.memo(SearchResults) as typeof SearchResults;