import {useState} from 'react';
import HomeTabSlaider from '@containers/home-tab-slider';
function HomeTab() {

		const [tabs , setTabs] = useState(1);

		const [isActive , setIsActive] = useState(1)




			let content;
			function tabsLogic(){

				if(tabs == 1){
					return content = <div className="mb-11">
						<HomeTabSlaider 
						date={"2023-03-01T01:02:03"} 
						variant="slider"
						/>	
					</div> 
			}
			else if(tabs == 2) {
				 return content = <div className="mb-11">
					 
					 <HomeTabSlaider 
						date={"2023-03-01T01:02:03"} 
						variant="slider"
						/>
				 </div>
			}
			else {
				return content = <div className="mb-11">
					
					 <HomeTabSlaider 
						date={"2023-03-01T01:02:03"} 
						variant="slider"
						/>
				</div>
			}
			}
  return (
	  <div>


	<div className="border-b-2 border-b-[#e6e6e6] scrollbar-hide mb-6 flex overflow-x-auto space-x-8">

		<button  className={`text-black  text-xl flex-shrink-0  sm:text-lg  w-48 mr-5 pb-2 ${isActive == 1 && "border-b-blue text-blue font-bold border-b-4"}` } onClick={()=>{
					setTabs(1)
					setIsActive(1)
					}}>HeadPhone</button>

		<button  className={`text-black w-48 flex-shrink-0 text-xl mr-5 pb-2  sm:text-lg   ${isActive == 2 && "border-b-blue font-bold text-blue border-b-4"}`} onClick={()=>{setTabs(2);setIsActive(2)}}>Computer & Laptop</button>


		<button  className={`text-black w-48 flex-shrink-0 text-xl mr-5 pb-2 sm:text-lg   ${isActive == 3 && "border-b-blue text-blue font-bold border-b-4"}`} onClick={()=>{setTabs(3);setIsActive(3)}}>Mobile & Tablet</button>



	</div>

	{
		tabsLogic()
	}
	
	</div>	
	
	);
}

export default HomeTab
