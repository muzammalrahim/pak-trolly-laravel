import {useState} from 'react';
import HomeTabSlaider from '@containers/home-tab-slider';
function HomeTab() {

		const [tabs , setTabs] = useState(1);
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
					 <p>test1</p>
					 <HomeTabSlaider 
						date={"2023-03-01T01:02:03"} 
						variant="slider"
						/>
				 </div>
			}
			else {
				return content = <div className="mb-11">
					<p>test</p>
					 <HomeTabSlaider 
						date={"2023-03-01T01:02:03"} 
						variant="slider"
						/>
				</div>
			}
			}
  return (
	  <div>


	<div className="border-b-2 border-b-[#e6e6e6] pb-4 mb-6">
		<button className="text-black border-b-4 text-xl border-b-blue mr-5 pb-2" onClick={()=>{setTabs(1)}}>Headphone</button>
		<button className="text-black text-xl mr-5 pb-2" onClick={()=>{setTabs(2)}}>Computer & Laptop</button>
		<button className="text-black text-xl mr-5 pb-2" onClick={()=>{setTabs(3)}}>Mobile & Tablet</button>
	</div>

	{
		tabsLogic()
	}
	
	</div>	
	
	);
}

export default HomeTab
