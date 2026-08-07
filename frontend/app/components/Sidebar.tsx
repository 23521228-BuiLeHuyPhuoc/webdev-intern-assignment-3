import Link from "next/link";
export default function Sidebar(){
    return(
        <>
        <div className="sidebar w-[13vw] h-[90vh]  bg-[yellow]">

            <div className="sidebar__container w-[100%] h-[100%] ">
            <div className="sidebar__text text-center text-[25px]">
                 Menu
            </div>
           
            <ul className="sidebar__list flex flex-col ">
                <li className="p-2 hover:bg-blue-200"><Link href="/dashboard">Dashboard</Link></li>
                <li className="p-2 hover:bg-blue-200"><Link href="/search-scores">Search Scores</Link></li>
                <li className="p-2 hover:bg-blue-200"><Link href="/reports">Reports</Link></li>
                <li className="p-2 hover:bg-blue-200"><Link href="/settings">Settings</Link></li>
            </ul>

            </div>
        </div>
        
        
        
        </>
    )
}