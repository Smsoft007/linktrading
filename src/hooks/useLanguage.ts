import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '/images/flags/us.svg'
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '/images/flags/kr.svg'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '/images/flags/cn.svg'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '/images/flags/jp.svg'
  },
  {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '/images/flags/th.svg'
  }
]

type LanguageStore = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLanguage: languages[0], // 기본값: 영어
      setLanguage: (language) => set({ currentLanguage: language })
    }),
    {
      name: 'language-storage'
    }
  )
)
