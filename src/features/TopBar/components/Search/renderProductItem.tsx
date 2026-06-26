import { Product } from "@/shared/types/product.types";
import Avatar from "antd/es/avatar";

  export const renderProductItem = (product: Product) => {
    return (
      <div className="flex items-center gap-3">
        {product.thumbnail && (
          <Avatar
            src={product.thumbnail}
            shape="square"
            size={48}
            className="rounded-lg shrink-0 border border-gray-200"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-800 truncate">
            {product.title || "محصول"}
          </div>

          {product.description && (
            <div className="text-sm text-gray-500 truncate">
              {product.description}
            </div>
          )}

          <div className="flex items-center gap-2 mt-0.5">
            {product.brand && (
              <span className="text-xs text-gray-400">{product.brand}</span>
            )}
            {product.category && (
              <>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-gray-400">
                  {product.category}
                </span>
              </>
            )}
          </div>
        </div>

        {product.price !== undefined && (
          <div className="text-primary font-bold text-sm shrink-0">
            ${product.price.toFixed(2)}
          </div>
        )}
      </div>
    );
  };