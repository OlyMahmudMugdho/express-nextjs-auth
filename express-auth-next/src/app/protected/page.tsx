"use client"
import isAuth from "@/utils/isAuth";

type Props = {}

function page({}: Props) {
  return (
    <div>
        Protected route
    </div>
  )
}

export default isAuth(page)