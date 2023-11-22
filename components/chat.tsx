'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'

// const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: any[]
  id?: string
}
interface Context {
  metadata: {
    url: string
    chunk: string
  }
}


export function Chat({ id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [pineconePreviewToken, setPineconePreviewToken] = useLocalStorage<string | null>(
    'pinecone-token',
    null
  )
  const [currentModel, setCurrentModel] = useLocalStorage<string | null>(
		'current-model',
		null
	)
  const [gotMessages, setGotMessages] = useState(false);
  const [context, setContext] = useState<string[] | null>(null);
  const [previewTokenDialog, setPreviewTokenDialog] = useState(false)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const [pineconeToken, setPineconeToken] = useState(pineconePreviewToken ?? '')

  const { messages, append, reload, stop, isLoading, input, setInput, setMessages } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        currentModel 
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      onFinish: async () => {
        
        setGotMessages(true);      }
    })

    useEffect(() => {
      if (!previewToken || !pineconePreviewToken) {
        setPreviewTokenDialog(true)
      }
    }, [previewToken])

 
    const getContext = async () => {
      const response = await fetch("/api/context", {
        method: "POST",
        body: JSON.stringify({
          messages,
        }),
      });
      const { context } = await response.json();
      // append context to the end of the messages
      if (context) {
        // get the last message
  
        const lastMessage = messages[messages.length - 1];
        //@ts-ignore
        lastMessage.context = context;
        // replace the last message with the new message
        messages[messages.length - 1] = lastMessage;
        const newMessages = [...messages];
      }
  
  
      setContext(context.map((c: any) => c.id));
    };
  
    const prevMessagesLengthRef = useRef(messages.length);
    useEffect(() => {
      
      if (gotMessages && messages.length >= prevMessagesLengthRef.current) {
        getContext();
        setGotMessages(false);       

      }
  
      prevMessagesLengthRef.current = messages.length;
    }, [messages, gotMessages]);

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} /> 
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

    </>
  )
}
