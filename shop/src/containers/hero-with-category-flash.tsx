// import BannerCard from "@components/common/banner-card";
// import CategoryListCard from "@components/common/category-list-card";
import SellWithProgress from "@components/common/sale-with-progress";
// import Carousel from "@components/ui/carousel/carousel";
// import { SwiperSlide } from "swiper/react";
// import { useCategoriesQuery } from "@framework/category/categories.query";
import { useProductsQuery } from "@framework/products/products.query";
import { useWindowSize } from "@utils/use-window-size";
// import CategoryListCardLoader from "@components/ui/loaders/category-list-card-loader";
// import { ROUTES } from "@lib/routes";
// import Alert from "@components/ui/alert";
import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
import NotFoundItem from "@components/404/not-found-item";
import React from "react";
// import { StaticBanner } from "@framework/types";

// interface Props {
//   data: StaticBanner[];
//   className?: string;
// }

const categoryResponsive = {
  "768": {
    slidesPerView: 3,
    spaceBetween: 14,
  },
  "480": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};





// ProgressCard section
export function SellWithProgressCardSection() {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const {
    data: products,
    isLoading: loading,
    error,
  } = useProductsQuery({
    limit: 10,
  });

  if (!loading && isEmpty(products?.data)) {
    return <NotFoundItem text={t("text-no-products-found")} />;
  }

  return (
    <>
      {width < 1441 ? (
        <SellWithProgress
          // TODO: Fix the types
          // @ts-ignore
          products={products?.data}
          className="col-span-full"
          loading={loading}
          error={error?.message}
        />
      ) : (
        <SellWithProgress
          // TODO: Fix the types
          // @ts-ignore
          products={products?.data}
          productVariant="gridSlim"
          loading={loading}
          imgWidth={330}
          imgHeight={425}
          error={error?.message}
          className="col-span-full 2xl:col-span-2 2xl:row-auto xl:hidden 2xl:flex"
        />
      )}
    </>
  );
}

