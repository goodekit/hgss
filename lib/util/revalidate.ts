"use server"

import { revalidatePath } from "next/cache"

export async function revalidate(path: string) {
  if (path) {
    revalidatePath(path)
  }
}
