
import React from 'react';
import Container from "@components/ui/container";

export default function TopHeader() {
  return (
	  <div className='bg-blue'>
	<Container className='w-full'>

		<div className="top-header lg:grid md:grid lg:grid-cols-12 md:grid-cols-12 pt-5 pb-5 grid-cols-none">
			
			<div className="lg:col-span-12 xl:col-span-6 2xl:col-span-12 justify-center md:col-span-12  sm:col-span-12 text-center sm:w-full sm:pb-0 sm:text-xs">
				<p className="text-sm text-white text-center p-0 m-0">Tell a friends about Electshop Electronics & get 30% off your next order.</p>
			</div>
			{/* <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-6 lg:justify-left md:col-span-6  sm:col-span-12 md:text-center sm:text-center sm:w-full  sm:pb-0 sm:text-xs">
				<p className="text-sm text-white text-left p-0 m-0">Tell a friends about Electshop Electronics & get 30% off your next order.</p>
			</div>
			<div className="lg:col-span-6 xl:col-span-6 2xl:col-span-6 justify-center md:col-span-6 sm:mt-2 sm:col-span-12 sm:w-full lg:text-right sm:pb-0 sm:text-center sm:text-xs">
				<ul>
					<li className="inline-block text-white justify-center text-right">
						<a href="#"  className="text-white text-xs pr-5 mr-5 border-r-1 border-white">Need Help?</a>
					</li>
					<li className="inline-block text-white justify-center text-right">
						<a href="#"  className="text-white text-xs pr-5 mr-5 border-r-1 border-white">Track Order</a>
					</li>
					<li className="inline-block text-white justify-center text-right">
						<a href="#"  className="text-white text-xs">Gift Cards</a>
					</li>
				</ul>
			</div> */}
			
			
	</div>
	</Container>
	</div>
	
  )
}
