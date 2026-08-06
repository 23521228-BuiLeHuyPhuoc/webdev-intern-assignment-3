import Link from "next/link";
export default function Sidebar(){
    return(
        <>
        <div id="sidebar" className="w-[13vw] h-[90vh] float-left bg-[yellow]">

            <div id="sidebar__container" className="w-[100%] h-[100%] pt-[20px]">
            <div id="sidebar__text" className="text-center text-[25px]">
                 Menu
            </div>
           
            <ul id="sidebar__list" className="flex flex-col ">
                <li className="p-2 hover:bg-gray-200"><Link href="/dashboard">Dashboard</Link></li>
                <li className="p-2 hover:bg-gray-200"><Link href="/search-scores">Search Scores</Link></li>
                <li className="p-2 hover:bg-gray-200"><Link href="/reports">Reports</Link></li>
                <li className="p-2 hover:bg-gray-200"><Link href="/settings">Settings</Link></li>
            </ul>

            </div>
        </div>
        
        
        
        </>
    )
}