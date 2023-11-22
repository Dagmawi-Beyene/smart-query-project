import * as React from 'react'
import { IconOpenAI, IconSeparator } from './ui/icons'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import Link from 'next/link'


export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
      <IconOpenAI className="w-6 h-6 text-primary" />
  <span className="text-lg font-semibold ">
  <Button variant="link" asChild className="-ml-2">
              <Link href="/"> SmartQuery Haaga-Helia AI Chatbot</Link>
            </Button>
  
  </span>
        <div className="flex items-center">
          <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
          
            <Button variant="link" asChild className="-ml-2">
              <Link href="/add-sources">Load data to db</Link>
            </Button>
  
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
      <ThemeToggle /> 
      </div>
  
    </header>
  )
}

