import React from "react"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../../features/authSlice"

export const CompaniesPage = () => {
  const { user } = useAppSelector(selectAuth)
  return <div>Companies page</div>
}
