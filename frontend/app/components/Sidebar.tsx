import Link from "next/link";
export default function Sidebar(){
    return(
        <>
        <div className="sidebar h-auto w-full shrink-0 bg-[yellow] md:min-h-[calc(100vh-76px)] md:w-[220px]">

            <div className="sidebar__container w-[100%] h-[100%] ">
            <div className="sidebar__text py-3 text-center text-[25px]">
                 Menu
            </div>
           
            <ul className="sidebar__list flex flex-row flex-wrap md:flex-col">
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
