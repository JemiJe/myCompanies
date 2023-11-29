import { isRejectedWithValue, isRejected } from "@reduxjs/toolkit"
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const errorHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action) || isRejected(action)) {
      const message = action.payload.data.message
      if (Array.isArray(message)) {
        toast.error(message.join(" "))
      } else {
        toast.error(action.payload.data.message)
      }
    }

    return next(action)
  }
