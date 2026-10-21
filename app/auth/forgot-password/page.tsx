// "use client";
// import type React from "react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2, Mail, Phone } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useForgotPasswordMutation } from "@/redux/feature/authSlice";


// export default function ForgotPassword() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const  [forgotPassword] = useForgotPasswordMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await forgotPassword({ phone:email });
//       console.log("response", response)
//       if (response.data) {
//         toast.success(
//           response.data.message ||
//           "otp sent successfully!"
//         );
//         router.push(`/auth/verfiy_email?email=${email}`);
//       } else if (response.error) {
//         toast.error(
//           response.error.data?.message || "otp failed. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("otp failed:", error);
//       toast.error("Something went wrong. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }

//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center pb-4">
//           <CardTitle className="text-2xl font-semibold text-gray-900">
//             Forgot Password
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Phone Number
//               </Label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   id=""
//                   type=""
//                   placeholder="Enter your phone number"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
//                   required
//                 />
//               </div>
//             </div>


//             <Button
//               type="submit"
//               className="w-full bg-[#1A1A1A]  hover:bg-[#1A1A1A]  text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Send OTP...
//                 </>
//               ) : (
//                 "Send OTP"
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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/redux/feature/authSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the styles for react-phone-input-2

export default function ForgotPassword() {
  const router = useRouter();
  const [phone, setPhone] = useState(""); // Changed from email to phone
  const [isLoading, setIsLoading] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
  //     console.log(formattedPhone, 'format')

  //     // const response = await login({ phone: formattedPhone, password });
  //     const response = await forgotPassword({ phone : formattedPhone });
  //     console.log("response", response);
  //     if (response.data) {
  //       toast.success(response.data.message || "OTP sent successfully!");
  //       router.push(`/auth/verfiy_email?phone=${encodeURIComponent({phone:formattedPhone})}`);
  //       // router.push(`/auth/verfiy_email?email=${email}`);
  //     } else if (response.error) {
  //       toast.error(response.error.data?.message || "OTP failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("OTP failed:", error);
  //     toast.error("Something went wrong. Please try again later.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Always ensure '+' is included
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      console.log(formattedPhone, "formatted phone");

      // Call your forgotPassword mutation
      const response = await forgotPassword({ phone: formattedPhone });
      console.log("response", response);

      if (response.data) {
        toast.success(response.data.message || "OTP sent successfully!");

        // ✅ Properly encode only the string, not an object
        router.push(`/auth/verfiy_email?phone=${encodeURIComponent(formattedPhone)}`);
      } else if (response.error) {
        toast.error(
          response.error.data?.message || "OTP failed. Please try again."
        );
      }
    } catch (error) {
      console.error("OTP failed:", error);
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
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="relative">
                <PhoneInput
                  country={"us"} // Default country (can be changed)
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

            <Button
              type="submit"
              className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A] text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}