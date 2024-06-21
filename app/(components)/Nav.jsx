
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export async function Nav() {
  const session = await getServerSession(options);
  console.log("tao");
  console.log(session);
  console.log("bi kep giua");
  // return {
  //   props: {
  //     session,
  //   },
  // };

  
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          {/* <Link href="/CreateUser">Create User</Link> */}
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">
              Logout
            </Link>
          ) : (
            <Link href="/signin">
              Login
            </Link>
          )}
          <p>{session?.user?.name}</p>
        </div>
      </nav>
    </header>
  );
};



export default Nav;
