



// export default function Home() {
  // const { data: session } = useSession()

//   return (
//     <div>
//       {session ? (
//         <div>
//           <p>Welcome, {session.user?.name}</p>
//           <button onClick={() => signOut()}>Sign out</button>
//         </div>
//       ) : (
//         <button onClick={() => signIn("google")}>Sign in with Google</button>
//       )}
//     </div>
//   )
// }


import { LoginForm } from "@/components/login-form"
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
