import {useState} from 'react';
function ProductTab() {

		const [tabs , setTabs] = useState(1);

		const [isActive , setIsActive] = useState(1)

			let content;
			function tabsLogic(){

				if(tabs == 1){
					return content = <div className="mb-11" onClick={()=> {
						setIsActive(1)
					}}>
						<div className="m-5">
							<h2 className="font-semibold text-xl text-black mb-2">Lorem Ipsum is simply dummy text of the printing and hntypesetting industry.</h2>
							<p className="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						</div>

						<div className="m-5">
					     	<h2 className="font-semibold text-xl text-black mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
							<p className="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						</div>
					</div> 
			}
			else if(tabs == 2) {
				 return content = <div className="mb-1" >
					 <div className="m-5">
					     	<h2 className="font-semibold text-xl text-black mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
							<p className="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						</div>
				 </div>
			}
			else {
				return content = <div className="mb-11" >
					 <div className="m-5">
					     	<h2 className="font-semibold text-xl text-black mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
							<p className="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						</div>
						<div className="m-5">
					     	<h2 className="font-semibold text-xl text-black mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
							<p className="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						</div>
						<div className="m-5">
					     	<h2 className="font-semibold text-xl text-black mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
							<p className="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
						</div>
				</div>
			}
			}
  return (
	  <div>


	<div className="border-b-2 border-b-[#e6e6e6] scrollbar-hide mb-6 flex overflow-x-auto space-x-8">
		<button  className={`text-black flex-shrink-0 text-xl sm:w-32 sm:text-lg  w-36 mr-5 pb-2 ${isActive == 1 && "border-b-blue text-blue font-bold border-b-4"}` } onClick={()=>{
					setTabs(1)
					setIsActive(1)
					}}>Description</button>
		<button  className={`text-black flex-shrink-0 w-40 text-xl mr-5 pb-2 sm:w-36 sm:text-lg   ${isActive == 2 && "border-b-blue font-bold text-blue border-b-4"}`} onClick={()=>{setTabs(2);setIsActive(2)}}>Product Details</button>
		<button  className={`text-black flex-shrink-0 w-40 text-xl mr-5 pb-2 sm:w-36 sm:text-lg   ${isActive == 3 && "border-b-blue text-blue font-bold border-b-4"}`} onClick={()=>{setTabs(3);setIsActive(3)}}>Attachments</button>
	</div>

	{
		tabsLogic()
	}
	
	</div>	
	
	);
}

export default ProductTab
