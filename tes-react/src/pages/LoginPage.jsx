// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// export const LoginPage = () => {
//   const [inputUsername, setInputUsername] = useState("");
//   const [inputPassword, setInputPassword] = useState("");

//   const [isChecked, setIsChecked] = useState(false);
//   const [inputUsernameMessage, setInputUsernameMessage] = useState("");
//   const [inputPasswordMessage, setInputPasswordMessage] = useState("");

//   const handleLogin = () => {
//     const usernameValid = inputUsername.length >= 5;
//     const passwordValid = inputPassword.length >= 8;

//     if (!usernameValid) {
//       alert("username must be at least 5 characters long");
//       return;
//     }
//     if (!passwordValid) {
//       alert("password must be at least 8 characters long");
//       return;
//     }

//     alert(`Username: ${inputUsername} | Password: ${inputPassword}`);
//   };

//   return (
//     <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
//       <form onSubmit={handleLogin} className="w-full max-w-[540px]">
//         <Card>
//           <CardHeader>
//             <CardTitle>Login</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-2">
//             <div>
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 onChange={(e) => {
//                   if (e.target.value.length < 5) {
//                     setInputUsernameMessage(
//                       "username must be at least 5 characters long"
//                     );
//                   } else {
//                     setInputUsernameMessage("");
//                   }

//                   setInputUsername(e.target.value);
//                 }}
//                 id="username"
//               />
//               <p className="text-sm text-muted-foreground">
//                 {inputUsernameMessage}
//               </p>
//             </div>
//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 onChange={(e) => {
//                   if (e.target.value.length < 8) {
//                     setInputPasswordMessage(
//                       "password must be at least 8 characters long"
//                     );
//                   } else {
//                     setInputPasswordMessage("");
//                   }
//                   setInputPassword(e.target.value);
//                 }}
//                 type={isChecked ? "text" : "password"}
//                 id="password"
//               />
//               <p className="text-sm text-muted-foreground">
//                 {inputPasswordMessage}
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 onCheckedChange={(checked) => setIsChecked(checked)}
//                 id="show-password"
//               />
//               <Label htmlFor="show-password">Show Password</Label>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <div className="flex flex-col space-y-4 w-full">
//               <Button
//                 type="submit"
//                 disabled={inputPassword.length < 5 || inputPassword.length < 8}
//               >
//                 Login
//               </Button>
//               <Button variant="link" className="w-full">
//                 Sign up instead
//               </Button>
//             </div>
//           </CardFooter>
//         </Card>
//       </form>
//     </main>
//   );
// };
