import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export async function WatchList() {
  const session = await getServerSession(options);
  
  

  
  return (
    <div className="text-white bold">
      Hello
      <p> {session?.user?.email} </p>
    </div>
  );
};



export default WatchList;