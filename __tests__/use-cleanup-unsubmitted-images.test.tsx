/** @jest-environment jsdom */

import { createElement } from 'react'
import { act, render } from '@testing-library/react'
import { useCleanupUnsubmittedImages } from 'hook/use-cleanup-unsubmitted-images'
import type { UseFormReturn } from 'react-hook-form'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

jest.mock('lib/action', () => ({
  deleteImage: jest.fn()
}))

const { usePathname } = jest.requireMock('next/navigation') as { usePathname: jest.Mock }
const { deleteImage } = jest.requireMock('lib/action') as { deleteImage: jest.Mock }

type FormShape = { images: string[]; __submitted: boolean }

const createFormMock = (initialImages: string[] = []) => {
  let initialCaptured = false
  let latestImages    = initialImages
  let submittedState  = false

  const getValues = jest.fn((field: keyof FormShape) => {
    if (field === 'images') {
      if (!initialCaptured) {
        initialCaptured = true
        return initialImages
      }
      return latestImages
    }

    if (field === '__submitted') {
      return submittedState
    }

    return undefined
  })

  const setImages = (images: string[]) => {
    latestImages = images
  }

  const setSubmitted = (value: boolean) => {
    submittedState = value
  }

  return {
    form        : { getValues } as unknown as UseFormReturn<FormShape>,
    setImages,
    setSubmitted,
    getValuesMock: getValues
  }
}

const TestHarness = ({ form }: { form: UseFormReturn<FormShape> }) => {
  useCleanupUnsubmittedImages(form, 'images' as never, '__submitted' as never)
  return null
}

const flushAsync = async () => {
  await act(async () => {
    await Promise.resolve()
  })
}

describe('useCleanupUnsubmittedImages', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    usePathname.mockReturnValue('/admin/products/edit')
    deleteImage.mockResolvedValue({ success: true })
  })

  it('deletes only newly added images during cleanup on unmount', async () => {
    const { form, setImages } = createFormMock(['persisted-1'])
    const { unmount }         = render(createElement(TestHarness, { form }))

    await flushAsync()
    setImages(['persisted-1', 'new-1', 'new-2'])

    await act(async () => {
      unmount()
    })
    await flushAsync()

    expect(deleteImage).toHaveBeenCalledTimes(2)
    expect(deleteImage).toHaveBeenCalledWith({ currentImages: 'new-1' })
    expect(deleteImage).toHaveBeenCalledWith({ currentImages: 'new-2' })
  })

  it('does not delete images when none were added after mount', async () => {
    const { form }    = createFormMock(['persisted-1'])
    const { unmount } = render(createElement(TestHarness, { form }))

    await flushAsync()

    await act(async () => {
      unmount()
    })
    await flushAsync()

    expect(deleteImage).not.toHaveBeenCalled()
  })

  it('skips cleanup once the form has been submitted', async () => {
    const { form, setImages, setSubmitted } = createFormMock(['persisted-1'])
    const { unmount }                       = render(createElement(TestHarness, { form }))

    await flushAsync()
    setImages(['persisted-1', 'new-1'])
    setSubmitted(true)

    await act(async () => {
      unmount()
    })
    await flushAsync()

    expect(deleteImage).not.toHaveBeenCalled()
  })
})
