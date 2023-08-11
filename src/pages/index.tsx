import { Inter } from 'next/font/google'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props: { randomString: string }){
  const [feedback, setFeedback] = useState(false)

  useEffect(() => {
    if (feedback) {
      setTimeout(() => {
        setFeedback(false)
      }, 1000 * 3)
    }
  }, [feedback, setFeedback])

  return (
    <main
      className={`flex h-96 flex-col items-center p-32 ${inter.className}`}
    >
      <p
        className="inline-flex cursor-pointer hover:bg-gray-700 p-4 rounded-md"
        onClick={() => {
          copyTextToClipboard(props.randomString)
          setFeedback(true)
        }}
      >
        {props.randomString}
      </p>
      {feedback && <p className="text-gray-600 mt-3">Copied to clipboard!</p>}
    </main>
  )
}

export async function copyTextToClipboard (text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}


export function getServerSideProps () {
  return {
    props: {
      randomString: btoa(uuidv4())
    },
  }
}
