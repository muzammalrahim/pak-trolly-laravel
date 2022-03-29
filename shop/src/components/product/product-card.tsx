import cn from "classnames";
import Image from "next/image";
import type { FC } from "react";
import { useUI } from "@contexts/ui.context";
import usePrice from "@lib/use-price";
import { Product } from "@framework/types";
import { siteSettings } from "@settings/site.settings";

interface ProductProps {
  product: Product;
  className?: string;
  contactClassName?: string;
  imageContentClassName?: string;
  variant?: "grid" | "gridSlim" | "list" | "listSmall";
  imgWidth?: number | string;
  imgHeight?: number | string;
  imgLoading?: "eager" | "lazy";
}

const ProductCard: FC<ProductProps> = ({
  product,
  className = "",
  contactClassName = "",
  imageContentClassName = "",
  variant = "list",
  imgWidth = 340,
  imgHeight = 440,
  imgLoading,
}) => {
  const { openModal, setModalView, setModalData } = useUI();
  const { name, image, min_price, max_price, product_type, description } =
    product ?? {};

  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price!,
    baseAmount: product?.price,
  });

  const { price: minPrice } = usePrice({
    amount: min_price!,
  });

  const { price: maxPrice } = usePrice({
    amount: max_price!,
  });

  function handlePopupView() {
    setModalData(product.slug);
    setModalView("PRODUCT_VIEW");
    return openModal();
  }

  return (
    <div
      className={cn(
        "group box-border overflow-hidden flex rounded-md cursor-pointer",
        {
          "ltr:pr-0 rtl:pl-0 pb-2 lg:pb-3 flex-row items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product":
            variant === "grid",
          "ltr:pr-0 rtl:pl-0 md:pb-1 flex-row items-start bg-white": variant === "gridSlim",
          "items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
            variant === "listSmall",
          "flex-row items-center transition-transform ease-linear bg-gray-200 ltr:pr-2 ltr:lg:pr-3 ltr:2xl:pr-4 rtl:pl-2 rtl:lg:pl-3 rtl:2xl:pl-4":
            variant === "list",
        },
        className
      )}
      onClick={handlePopupView}
      role="button"
      title={name}
    >
      <div
        className={cn(
          "flex",
          {
            "mb-3 md:mb-3.5": variant === "grid",
            "mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
            "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
              variant === "listSmall",
          },
          imageContentClassName
        )}
      >
        
        <Image
          src={image?.original ?? siteSettings?.product?.placeholderImage()}
          width={imgWidth}
          height={imgHeight}
          loading={imgLoading}
          quality={100}
          alt={name || "Product Image"}
          className={cn("bg-gray-300 object-cover ltr:rounded-l-md rtl:rounded-r-md", {
            "w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none":
              variant === "grid",
            "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
              variant === "gridSlim",
            "ltr:rounded-l-md rtl:rounded-r-md transition duration-200 ease-linear transform group-hover:scale-105":
              variant === "list",
          })}
        />
      </div>
      
      <div
        className={cn(
          "w-full overflow-hidden",
          {
            "ltr:pl-0 rtl:pr-0 ltr:lg:pl-2.5 ltr:xl:pl-4 rtl:lg:pr-2.5 rtl:xl:pr-4 ltr:pr-2.5 ltr:xl:pr-4 rtl:pl-2.5 rtl:xl:pl-4": variant === "grid",
            "ltr:pl-0 rtl:pr-0": variant === "gridSlim",
            "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
          },
          contactClassName
        )}
      >
        <div className=" pt-5 pb-5">
        <ul className="align-bottom">
          <li className="inline-block">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </li>
          <li className="inline-block">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </li>
          <li className="inline-block">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </li>
          <li className="inline-block">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
            </svg>
          </li>
          <li className="inline-block">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-yellow-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
            </svg>
          </li>
        </ul>
        <span className="text-body text-sm lg:text-base leading-6 lg:leading-8 inline-block pl-7">0 Review</span>
        <a href="#" className="inline-block pl-7 text-blue">Submit a review</a>
        </div>
        <h2
          className={cn("text-heading font-semibold truncate mb-1", {
            "text-sm md:text-base": variant === "grid",
            "md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
              variant === "gridSlim",
            "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
            "text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
              variant === "list",
          })}
        >
          {name}
        </h2>
        {description && (
          <p className="text-body text-xs md:text-[13px] lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
            {description}
          </p>
        )}
        <div
          className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-x-1 rtl:space-x-reverse ${
            variant === "grid"
              ? "3xl:text-lg lg:mt-2.5"
              : "sm:text-lg md:text-base 3xl:text-xl md:mt-2.5 2xl:mt-3"
          }`}
        >
          {product_type.toLocaleLowerCase() === "variable" ? (
            <>
              <span className="inline-block">{minPrice}</span>
              <span> - </span>
              <span className="inline-block">{maxPrice}</span>
            </>
          ) : (
            <>
              <span className="inline-block">{price}</span>

              {basePrice && (
                <del className="sm:text-base font-normal text-gray-800 ltr:pl-1 rtl:pr-1">
                  {basePrice}
                </del>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
