import "./assets/App.css"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Loading from "./components/Loading/Loading.js"
import ErrorComponent from "./components/ErrorComponent/ErrorComponent.js"
import Home from "./pages/Home/Home"
import Key from "./pages/Key/Key.js"
import NotFound from "./pages/NotFound/NotFound.js"
import {getKeys} from "./api/keys.js"
import SearchList from "./pages/SearchList/SearchList"
import { Route, Routes } from "react-router-dom"
import { createContext, useContext, useEffect, useState } from "react"
import { ReplaceOptions } from "mongodb"
import { useQuery } from "@tanstack/react-query"

type ThemeContextType = {
  theme: "light" | "dark",
  switchTheme: () => void,
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if(!themeContext)
    throw new Error("Cannot use outside provider.")
  else
    return themeContext;
}

type FontContextType = {
  fonts: string[],
  currentFont: string,
  switchFont: (pickedFont: string) => void,
}

const FontContext = createContext<FontContextType | null>(null)

export const useFontContext = () => {
  const fontContext = useContext(FontContext);
  if(!fontContext)
    throw new Error("Cannot use outside a provider.")
  else
    return fontContext
}

export type MeaningType = {
  partOfSpeech: string,
  definitions: {
    definition: string,
    synonyms: string[],
    antonyms: string[],
    example?: string,
  }[],
  synonyms: string[],
  antonyms: string[],
}

export type KeyDict = {
  word: string,
  phonetic: string,
  phonetics: {
    text?: string,
    audio?: string,
    sourceUrl?: string,
    license?: {
      name: string,
      url: string,
    },
  }[],
  meanings: MeaningType[]
  license: {
    name: string,
    url: string,
  },
  sourceUrls: string[],
}

type KeysContextType = KeyDict[]

const KeysContext = createContext<KeysContextType | null>(null)

export const useKeysContext = () => {
  const keysContext = useContext(KeysContext);
  if(!keysContext)
    throw new Error("Cannot use outside a provider.")
  else
    return keysContext;
}

function App() {

  const keysQuery = useQuery({
    queryKey: ["keys"],
    queryFn: getKeys
  })

  useEffect(() => {
    console.log(keysQuery.data)
  }, [keysQuery])


  // @ts-expect-error: Ridiculous error
  const [theme, setTheme] = useState<ThemeContextType["theme"]>(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
  // @ts-expect-error: Ridiculous error 2
  const [font, setFont] = useState<FontContextType["currentFont"]>(localStorage.getItem("font") ? localStorage.getItem("font") : "sans-serif");

  useEffect(() => {
    const body = document.querySelector<HTMLBodyElement>("body")!
    switch(font){
      case "sans-serif":
        body?.style.setProperty("font-family", "'Roboto', sans-serif");
        break;
      case "serif":
        body?.style.setProperty("font-family", "'Merriweather', serif")
        break;
    }
  }, [font])

  useEffect(() => {
    const body = document.querySelector<HTMLBodyElement>("body")!
    switch(theme){
      case "dark":
        if(!body.classList.contains("dark"))
          body.classList.add("dark")
        body.classList.remove("light")
        break;
        case "light":
          if(!body.classList.contains("light"))
            body.classList.add("light")
          body.classList.remove("dark")
          break;
    }
  }, [theme])

  const switchFont = (newFont: string) => {
    localStorage.setItem("font", newFont);
    setFont(newFont);
  }

  const switchTheme = () => {
    switch(theme){
      case "dark":
        localStorage.setItem("theme", "light")
        setTheme("light")
        break;
      case "light":
        localStorage.setItem("theme", "dark")
        setTheme("dark")
        break;
    }
  }

  if(keysQuery.status == "pending") 
    return <>
      <Routes>
        <Route 
          path="/*" element={<Loading />}
        />
      </Routes>
    </>
  if(keysQuery.status == "error")
    return <>
      <Routes>
        <Route 
          path="/*" element={<ErrorComponent />}
        />
      </Routes>
    </>

  return <KeysContext.Provider
    value={keysQuery.data}
  >
    <ThemeContext.Provider
      value={{
        theme: theme,
        switchTheme: switchTheme
      }}
      >
      <FontContext.Provider
        value={{
          fonts: [
            "sans-serif",
            "serif",
          ],
          currentFont: font,
          switchFont: switchFont,
        }}
      >
        <Navbar />  
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/searchlist" 
            element={<SearchList />} 
          />
          <Route 
            path="/key/:id"
            element={<Key />}
          />
          <Route
            path="/*"
            element={<NotFound />}
          />
        </Routes>
        <Footer />
      </FontContext.Provider>
    </ThemeContext.Provider>
  </KeysContext.Provider>
}

export default App
