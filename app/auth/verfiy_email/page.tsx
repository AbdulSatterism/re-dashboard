"use client"

import { useVerifyEmailMutation } from "@/redux/feature/authSlice"
import { useRouter, useSearchParams } from "next/navigation"
import type React from "react"

import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent, Suspense } from "react"
import { toast } from "sonner"

function VerifyEmail() {

  // const email = new URLSearchParams(window.location.search).get("email")
  const email = useSearchParams().get("phone")
  console.log("email", email)

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const [verifyEmail] = useVerifyEmailMutation()

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current field is empty, go to previous field
        inputRefs.current[index - 1]?.focus()
      } else {
        // Clear current field
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Handle Enter key
    if (e.key === "Enter") {
      handleVerify()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

    if (pastedData.length > 0) {
      const newOtp = [...otp]
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || ""
      }
      setOtp(newOtp)

      // Focus the next empty field or the last field
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "")
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
      inputRefs.current[focusIndex]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      alert("Please enter all 6 digits")
      return
    }

    setIsLoading(true)


    try {
      const response = await verifyEmail({ phone: email, oneTimeCode: Number(otpString) });
      console.log("response", response)

      if (response.data) {
        toast.success(response.data.message || "Email verified successfully!");
        localStorage.setItem("verificationToken", response?.data?.data?.accessToken);
        router.push("/auth/reset-password");
      } else if (response.error) {
        toast.error(response.error.data?.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <div className="mt-[150px] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-medium text-gray-900 text-center mb-8">Verify Email</h1>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-lg font-medium bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              disabled={isLoading}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={!isComplete || isLoading}
          className="w-full bg-[#1A1A1A]  hover:bg-[#1A1A1A]  disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </div>
          ) : (
            "Verify"
          )}
        </button>

        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => {
                console.log("Resending verification code...")
                alert("Verification code sent!")
              }}
            >
              Resend
            </button>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return <Suspense fallback={<div>Loading...</div>}><VerifyEmail /></Suspense>
}