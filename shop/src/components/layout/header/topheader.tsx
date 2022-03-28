
import React from 'react';
import Container from "@components/ui/container";

export default function TopHeader() {
  return (
	  <div className='bg-blue'>
	<Container className='w-full'>

		<div className="top-header  grid grid-cols-12 pt-5 pb-5">
			
			<div className="lg:col-span-6 justify-center  md:col-span-12 sm:col-span-12 col-span-12 sm:text-center sm:pb-0">
				<p className="text-sm text-white text-left p-0 m-0">Tell a friends about Electshop Electronics & get 30% off your next order.</p>
			</div>
			<div className="lg:col-span-6 justify-center  md:col-span-12 sm:col-span-12 col-span-12 lg:text-right sm:pb-0">
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
			</div>
			
			
	</div>
	</Container>
	</div>
	
  )
}
