
// "use client";
// import type React from "react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
// import Link from "next/link";
// import { useLoginMutation } from "@/redux/feature/authSlice";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { saveTokens } from "@/service/authService";

// export default function Component() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [login] = useLoginMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await login({ phone: email, password });

//       if (response.data) {
//         toast.success(
//           response.data.message ||
//           "Login successful! Redirecting to dashboard..."
//         );
//         localStorage.setItem("accessToken", response?.data?.data?.accessToken);
//         await saveTokens(response?.data?.data?.accessToken);
//         router.push("/");
//       } else if (response.error) {
//         toast.error(
//           response.error.data?.message || "Login failed. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error("Something went wrong. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }

//   };

//   return (
//     <div className=" mt-[150px] flex  items-center justify-center">
//       <Card className="w-full max-w-md ">
//         <CardHeader className="text-center pb-4">
//           <CardTitle className="text-2xl font-semibold text-gray-900">
//             Log in
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                 Phone Number
//               </Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   id="email"
//                   type="tel"
//                   placeholder="Enter your phone number"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <Label
//                 htmlFor="password"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Password
//               </Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"} // ✅ toggle type
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 </button>
//               </div>
//             </div>

//             {/* Remember me + Forgot password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="remember"
//                   checked={rememberMe}
//                   onCheckedChange={(checked) =>
//                     setRememberMe(checked as boolean)
//                   }
//                 />
//                 <Label htmlFor="remember" className="text-sm text-gray-600">
//                   Remember me
//                 </Label>
//               </div>
//               <Link
//                 href="/auth/forgot-password"
//                 className="text-sm text-red-500 hover:text-red-600 transition-colors"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Submit button */}
//             <Button
//               type="submit"
//               className="w-full bg-[#1A1A1A]  hover:bg-[#1A1A1A]  text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Logging in...
//                 </>
//               ) : (
//                 "Log in"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useLoginMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveTokens } from "@/service/authService";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Component() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  console.log(phone, 'phone')
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const response = await login({ phone, password });
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      console.log(formattedPhone, 'format')

      const response = await login({ phone: formattedPhone, password });

      if (response.data) {
        toast.success(
          response.data.message || "Login successful! Redirecting to dashboard..."
        );
        localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        await saveTokens(response?.data?.data?.accessToken);
        router.push("/");
      } else if (response.error) {
        toast.error(
          response.error.data?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[150px] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Log in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="relative">
                <PhoneInput
                  country={"us"} // Default country (can be changed, e.g., 'in' for India)
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputProps={{
                    id: "phone",
                    required: true,
                    placeholder: "Enter your phone number",
                    className:
                      "w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1A1A1A] focus:ring-[#1A1A1A]",
                  }}
                  buttonStyle={{
                    background: "transparent",
                    border: "none",
                    paddingLeft: "8px",
                  }}
                  dropdownStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />

              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A] text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}