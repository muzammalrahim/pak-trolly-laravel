import Widgets from "./widgets";
import Copyright from "./copyright";
import { footer } from "./data";
import Link from "next/link";
import User from "../../../../public/assets/images/footer/user.png"
import Phone from "../../../../public/assets/images/footer/phone.png"
import Mail from "../../../../public/assets/images/footer/mail.png"
import Container from "@components/ui/container";
// import { Link } from "react-scroll";
import Image from 'next/image'


const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-heading pt-5 pb-3 md:pb-1 lg:pt-0 2xl:pt-10">
    <Container>
    <div className="flex flex-col md:flex-row mb-4 gap-5">   
        <div className="w-ful md:w-1/4 ">
          <div className="">
            <h3 className="text-white text-sm md:text-base xl:text-lg font-semibold mb-2 2xl:mb-6 3xl:mb-7">
              About Information
            </h3>
            <div>
              <p className="text-white transition-colors">
                We are with 5 years of experiance along with Excellelent
                Customer Rating & with huge high quality electronice collection.
              </p>
            </div>
          </div>
        </div>

        <div className="w-ful md:w-1/4 ">
          <h3 className="text-white text-sm md:text-base xl:text-lg font-semibold mb-2 2xl:mb-6 3xl:mb-7">
              Product
            </h3>
          <ul>
            <li className="text-white transition-colors duration-200 hover:text-blue">
              <Link href="">
                  <a>Shipping & Delivery</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>All Products</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>Return & Exchanges</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>FAQ & Helps</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>Deals</a>
              </Link>
            </li>
            
          </ul>
        </div>


        <div className="w-ful md:w-1/4 ">
          <h3 className="text-white text-sm md:text-base xl:text-lg font-semibold mb-2 2xl:mb-6 3xl:mb-7">
             Company
          </h3>
          <ul className="">
            <li className="text-white transition-colors duration-200 hover:text-blue">
              <Link href="">
                  <a>About Us</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>Customer Support</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>Support Center</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>Terms & conditions</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
              <Link href="">
                  <a>Copyright</a>
              </Link>
            </li>
            
          </ul>
        </div>

        <div className="w-ful md:w-1/4 ">
          <h3 className="text-white text-sm md:text-base xl:text-lg font-semibold mb-2 2xl:mb-6 3xl:mb-7">
            Contact Information
          </h3>
          <ul className="">
            <li className="flex flex-row items-start text-white">
              <div className="relative top-1">
                <Image
                  src={User}
                  alt="Picture of the author"
                  width="25px"
                  height="25px"
                />
              </div>
            
              <p className="pl-5">
                House#21, Street#5, G 13/3, Islamabad.
              </p>
            </li>
            <li className="flex flex-row items-start text-white transition-colors duration-200 mt-3 hover:text-black">
            <Image
                src={Phone}
                alt="Picture of the author"
                width="20px"
                height="20px"
              />
              <Link href="call-to:+ 051 123 123 2">
                  <a className="pl-5 transition-colors duration-200 hover:text-blue">+ 051 123 123 2</a>
              </Link>
            </li>
            <li className="text-white transition-colors duration-200 mt-3 hover:text-blue">
            <Image
                src={Mail}
                alt="Picture of the author"
                width="20px"
                height="15px"
              />
              <Link href="">
                  <a className="pl-5 transition-colors duration-200 mt-3 hover:text-blue">paktrolly@support.com</a>
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
      
    </Container>
    
    {/* <Widgets widgets={widgets} /> */}
    <Copyright payment={payment} />
  </footer>
);

export default Footer;
