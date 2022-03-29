import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import CollectionBlock from "@containers/collection-block";
import BannerCarouselBlock from "@containers/banner-carousel-block";
import Divider from "@components/ui/divider";
import DownloadApps from "@components/common/download-apps";
import Support from "@components/common/support";
import Subscription from "@components/common/subscription";
import HeroBlock from "@containers/hero-block";
import BrandBlock from "@containers/brand-block";
import CategoryBlock from "@containers/category-block";
import FeatureBlock from "@containers/feature-block";
import { getLayout } from "@components/layout/layout";
import FlashSaleBlock from "@components/product/feeds/flash-sale-product-feed";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import TestimonialCarousel from "@containers/testimonial-carousel";
import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
import { SellWithProgressCardSection } from "@containers/hero-with-category-flash";
import HomeTab from "@components/product/home-tabs";
import { useEffect } from "react";
import { ROUTES } from "@lib/routes";
import { useUI } from "@contexts/ui.context";
import {
  standardDemoBanner as banner,
  standardDemoHeroBanner as heroBanner,
  standardDemoPromotionBanner as promotionalBanner,
} from "@data/static/banners";
import { collectionData } from "@data/static/collection";

export { getStaticProps } from "@framework/ssr/homepage/standard";

export default function Home() {
  // const { openModal, setModalView } = useUI();

  // useEffect(() => {
  //   setModalView("NEWSLETTER_VIEW");
  //   setTimeout(() => {
  //     openModal();
  //   }, 2000);
  // }, []);

  return (
    <>
      <HeroBlock data={heroBanner} />
      <Container>
        {/* <FlashSaleBlock /> */}
        <BannerCarouselBlock banners={promotionalBanner} />
        <FeatureBlock />
        <HomeTab/>
        <BannerCard
          data={banner}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          classNameInner="h-28 sm:h-auto"
        />
        </Container>

        {/* <CategoryBlock sectionHeading="text-shop-by-category" /> */}
        <CategoryBlock sectionHeading="text-shop-by-category" variant="rounded" />
        
        
        <Container>
        <ProductsFlashSaleBlock 
          date={"2023-03-01T01:02:03"} 
          variant="slider"
        />
        <Divider />
        {/* <BestSellerProductFeed /> */}
        <BannerCard
          data={banner}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          classNameInner="h-28 sm:h-auto"
        />
        <h5 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold">Deal of day</h5>
        {/* <div className="flex mb-4 gap-5">
          
          <div className="w-1/2 "><SellWithProgressCardSection /></div>
          <div className="w-1/2 "><SellWithProgressCardSection /></div>
        </div> */}
        
        <SellWithProgressCardSection />
        
        
          {/* <NewArrivalsProductFeed /> */}
          {/* <Divider /> */}
          <BannerCard
          data={banner}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0 mt-10"
          classNameInner="h-28 sm:h-auto"
        />
          <TestimonialCarousel sectionHeading="text-testimonial" />
          
          
        </Container>
        <BrandBlock sectionHeading="text-top-brands" />
        <Subscription className="px-5 sm:px-16 xl:px-0 py-12 md:py-5 xl:py-5" />
        {/* <CollectionBlock data={collectionData} /> */}
       
        {/* <DownloadApps className="bg-linen" /> */}
        {/* <Support /> */}
        
      
      
    </>
  );
}

Home.getLayout = getLayout;
