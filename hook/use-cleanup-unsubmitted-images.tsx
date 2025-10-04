'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Path, UseFormReturn } from 'react-hook-form'
import { z, ZodSchema } from 'zod'
import { deleteImage } from 'lib/action'

/**
 * Custom React hook that automatically deletes uploaded images from S3
 * if the user navigates away from the page or closes the tab without submitting the form.
 *
 *  * This hook is designed for use with react-hook-form and supports both single string and string[] attachment fields.
 * It listens for both browser unload events (e.g., closing the tab or refreshing) and internal Next.js route changes
 * (via pathname changes) to trigger image cleanup.
 *
 * The deletions happen asynchronously and are triggered immediately on navigation or unload.
 *
 * @template TSchema - The Zod schema type for the form.
 * @param form {UseFormReturn<z.infer<TSchema>>} The react-hook-form instance managing the form state.
 * @param name {Path<z.infer<TSchema>>} The field path (string or string[]) containing the image URL(s) to clean up if unsubmitted.
 * @param submittedFieldName {Path<z.infer<TSchema>>} Optional field path indicating form submission state. Defaults to '__submitted'.
 *
 * @remarks
 * - Works for both single string and string[] attachment fields.
 * - Listens to both browser unload events and Next.js route/pathname changes to trigger cleanup.
 * - Deletions are performed asynchronously and immediately on navigation or unload.
 * - Cleanup is skipped if the form is marked as submitted.
 */
export function useCleanupUnsubmittedImages<TSchema extends ZodSchema>(form:UseFormReturn<z.infer<TSchema>>, name: Path<z.infer<TSchema>>, submittedFieldName: Path<z.infer<TSchema>> = '__submitted' as  Path<z.infer<TSchema>>) {
    const pathname         = usePathname()
    const initialImagesRef = useRef<Set<string>>(new Set())

    useEffect(() => {
        const toArray = (value: unknown): string[] => {
            if (Array.isArray(value)) {
                return value.filter((item): item is string => typeof item === 'string' && Boolean(item))
            }
            return typeof value === 'string' && value ? [value] : []
        }

        if (initialImagesRef.current.size === 0) {
            const initialImages            = toArray(form.getValues(name))
                  initialImagesRef.current = new Set(initialImages)
        }

        const cleanup = async () => {
            const isSubmitted = form.getValues(submittedFieldName)
            if (isSubmitted) return

            const images = toArray(form.getValues(name))
            if (!images.length) return

            const initialImages  = initialImagesRef.current
            const imagesToDelete = images.filter((image) => !initialImages.has(image))

            for (const image of imagesToDelete) {
                await deleteImage({ currentImages: image })
            }
        }
        const handleBeforeUnload = () => {
            void cleanup()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            void cleanup()
        }
    }, [pathname, form, name, submittedFieldName])
}
