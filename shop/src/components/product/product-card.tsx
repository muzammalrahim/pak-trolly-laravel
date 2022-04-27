import React , {useState} from 'react'
import cn from "classnames";
import type { FC } from "react";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import StarIcon from "@components/icons/star-icon";
// import Count from "./count";
import Button from "@components/ui/button";
// import Counter from '@components/common/counter';
import { getVariations } from "@framework/utils/get-variations";
import { useCart } from "@store/quick-cart/cart.context";
import usePrice from "@lib/use-price";
import { generateCartItem } from "@utils/generate-cart-item";
import { ProductAttributes } from "./product-attributes";
import isEmpty from "lodash/isEmpty";
import Link from "@components/ui/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { Attachment, Product } from "@framework/types";
import isEqual from "lodash/isEqual";
import VariationPrice from "@components/product/product-variant-price";
import { useTranslation } from "next-i18next";
import isMatch from "lodash/isMatch";
import { ROUTES } from "@lib/routes";




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

const productGalleryCarouselResponsive = {
  "768": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1,
  },
};

type Props = {
  product: Product;
};
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
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const { addItemToCart } = useCart();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  // const { price:any, basePrice : any } = usePrice({
  //   amount: product?.sale_price ? product?.sale_price : product?.price!,
  //   baseAmount: product?.price,
  // });

  const variations = getVariations(product?.variations!);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 600);

    // const item = generateCartItem(product!, selectedVariation);
    // addItemToCart(item, quantity);
    toast(t("add-to-cart"), {
      type: "dark",
      progressClassName: "fancy-progress-bar",
      position: width > 768 ? "bottom-right" : "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  function handleAttribute(attribute: any) {
    // Reset Quantity
    if (!isMatch(attributes, attribute)) {
      setQuantity(1);
    }

    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
  }

  // Combine image and gallery
  // const combineImages = [...product?.gallery, product?.image];
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
        "group border-gray-50 box-border overflow-hidden flex rounded-md cursor-pointer ",
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
          "w-full overflow-hidden ml-5",
          {
            "ltr:pl-0 rtl:pr-0 ltr:lg:pl-2.5 ltr:xl:pl-4 rtl:lg:pr-2.5 rtl:xl:pr-4 ltr:pr-2.5 ltr:xl:pr-4 rtl:pl-2.5 rtl:xl:pl-4": variant === "grid",
            "ltr:pl-0 rtl:pr-0": variant === "gridSlim",
            "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
          },
          contactClassName
        )}
      >
        
       <div className='h-16 overflow-hidden'>
       <h2
          className={cn("text-heading font-semibold truncate mb-1", {
            "text-sm md:text-base text-lg": variant === "grid",
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
       </div>
       <div className="h-14 overflow-hidden">
        <div
          className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-x-1 rtl:space-x-reverse ${
            variant === "grid"
              ? "3xl:text-lg lg:mt-2.5"
              : "sm:text-lg md:text-base 3xl:text-xl md:mt-2.5 2xl:mt-3"
          }`}
        >
          {product_type.toLocaleLowerCase() === "variable" ? (
           
            <>
              
              <span className="inline-block line-through text-gray-500 text-sm">{minPrice}</span>
              {/* <span> - </span> */}
              <span className="inline-block text-blue text-2xl font-semibold pl-3 text-sm">{maxPrice}</span>
              
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
        <div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5">
					{Array.from({ length: 4}).map((_, idx) => (
						<StarIcon key={idx} />
					))}
					{Array.from({ length: 4 - 3}).map((_, idx) => (
						<StarIcon color="#e6e6e6" key={idx} />
					))}
			</div>
{/* <CountDown /> */}



     <div className="">
     <Button
                    onClick={addToCart}
                    variant="slim"
                    className={`bg-blue hover:bg-blue-700 text-white mt-5 font-bold pl-3 pr-3 h-11 rounded-md ${
                      !isSelected && " hover:bg-blue hover:text-white hover:border-blue"
                    }`}
                    disabled={
                      !isSelected ||
                      !product?.quantity ||
                      (!isEmpty(selectedVariation) && !selectedVariation?.quantity)
                    }
                    loading={addToCartLoader}
                  >
                   <svg width="36" height="36" viewBox="0 0 39 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M39 19.5955C39 19.1747 38.6588 18.8346 38.2391 18.8346H10.8243C10.6522 18.8346 10.501 18.7251 10.4463 18.561L6.03581 4.21751C5.20524 1.69496 5.20225 0 2.54642 0H0.760942C0.340186 0 0 0.341181 0 0.760942C0 1.1807 0.34118 1.52188 0.760942 1.52188H2.54642C3.76094 1.52387 3.91611 2.3813 4.58952 4.69297L9 19.0365C9.25961 19.8253 9.99271 20.3554 10.8233 20.3554H38.2391C38.6588 20.3564 39 20.0153 39 19.5955Z" fill="white"/>
                      <path d="M18.7888 21.4397C17.5872 21.4397 16.6134 22.4135 16.6134 23.6151C16.6134 24.8167 17.5872 25.7905 18.7888 25.7905C19.9904 25.7905 20.9642 24.8167 20.9642 23.6151C20.9642 22.4145 19.9894 21.4397 18.7888 21.4397Z" fill="white"/>
                      <path d="M29.1426 21.4397C27.941 21.4397 26.9672 22.4135 26.9672 23.6151C26.9672 24.8167 27.941 25.7905 29.1426 25.7905C30.3442 25.7905 31.317 24.8167 31.317 23.6151C31.317 22.4145 30.3442 21.4397 29.1426 21.4397Z" fill="white"/>
                      <path d="M37.0096 17.0521C37.0255 17.0054 37.0354 16.9556 37.0354 16.9039C37.0354 16.6642 36.8405 16.4692 36.5998 16.4692L23.1445 16.4702C22.9048 16.4702 22.7098 16.6662 22.7098 16.9059C22.7098 17.1456 22.9048 17.3406 23.1455 17.3406L36.6008 17.3386C36.7888 17.3386 36.9489 17.2192 37.0096 17.0521Z" fill="white"/>
                      <path d="M30.555 2.25297L25.9715 1.9486L30.5541 1.64422L30.6008 1.64124C30.7669 1.64521 30.9012 1.78149 30.9012 1.9486C30.9012 2.1157 30.7669 2.25198 30.6008 2.25596L30.555 2.25297Z" fill="white"/>
                      <path d="M32.1038 4.72877L26.2311 4.33785L32.1028 3.94793L32.1624 3.94495C32.3753 3.94992 32.5474 4.12399 32.5474 4.33885C32.5474 4.5537 32.3753 4.72777 32.1624 4.73274L32.1038 4.72877Z" fill="white"/>
                      <path d="M33.2815 7.37571L26.62 6.93307L33.2795 6.49043L33.3471 6.48645C33.5888 6.49242 33.7838 6.68937 33.7838 6.93307C33.7838 7.17577 33.5888 7.37372 33.3471 7.37969L33.2815 7.37571Z" fill="white"/>
                  </svg>
                    
                    <span className="py-2 text-lg pl-2 pr-0">
                      {product?.quantity ||
                      (!isEmpty(selectedVariation) && selectedVariation?.quantity)
                        ? t("text-add-to-cart")
                        : t("text-out-stock")}
                    </span>
                  </Button>
     </div>
      </div>
      
    </div>
  );
};

export default ProductCard;
